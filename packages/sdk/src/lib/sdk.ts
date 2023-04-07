// Modules
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ComposeClient } from '@composedb/client'
import { DIDSession } from 'did-session'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { definition } from './__generated__/definition.js'

import { WalletTreeApi } from '@wallettree/api-client'

// Types
import { RuntimeCompositeDefinition } from '@composedb/types'
import type { CeramicApi } from '@ceramicnetwork/common'
import { WalletTreeConfig } from './models/WalletTreeConfig.js'
import { SocialProviders } from './models/SocialProviders.js'

// Sub classes
import { Profile } from './services/sdk.profile.js'
import { Wallets } from './services/sdk.wallets.js'

// If you are relying on an injected provider this must be here otherwise you will have a type error.
declare global {
    interface Window {
        ethereum: any
    }
}

export class WalletTreeSDK {
    ceramicUrl: string
    sessionKeyId: string
    defaultNumWallets: number = 30

    apiKey: string
    ceramic: CeramicApi
    composeClient: ComposeClient

    profile: Profile
    wallets: Wallets

    private _profileId: string

    /**
     * Creates a new WalletTreeSDK instance.
     * @param args SDK configuration
     */
    constructor(args: WalletTreeConfig) {
        if (!args.apiKey) {
            throw new Error('WalletTreeSDK requires an API key')
        }

        this.apiKey = args.apiKey
        this.ceramicUrl = args.ceramicUrl || process.env['WALLETTREE_CERAMIC_URL']
        this.sessionKeyId = args.sessionKeyId || 'walletTreeDID'

        this.ceramic = new CeramicClient(args.ceramicUrl)
        this.composeClient = new ComposeClient({
            ceramic: args.ceramicUrl,
            definition: definition as RuntimeCompositeDefinition,
        })

        this.profile = new Profile(args)
        this.wallets = new Wallets(args)
    }

    public get profileId() {
        return this._profileId
    }

    public set profileId(id: string) {
        this._profileId = id
    }

    /**
     * Loads existing or creates new authenticatd wallet session.
     * @param provider Optional Ethereum provider - uses window.ethereum by default
     * @returns
     */
    authenticate = async (provider?: any) => {
        const sessionStr = localStorage.getItem(this.sessionKeyId)
        let session

        if (sessionStr) {
            session = await DIDSession.fromSession(sessionStr)
        }

        if (!session || (session.hasSession && session.isExpired)) {
            if (window.ethereum === null || window.ethereum === undefined) {
                throw new Error('No injected Ethereum provider found.')
            }

            // We enable the ethereum provider to get the user's addresses.
            const ethProvider = provider || window.ethereum
            // request ethereum accounts.
            const addresses = await ethProvider.enable({
                method: 'eth_requestAccounts',
            })
            const accountId = await getAccountId(ethProvider, addresses[0])
            const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

            /**
             * Create DIDSession & provide capabilities that we want to access.
             * @NOTE: Any production applications will want to provide a more complete list of capabilities.
             *        This is not done here to allow you to add more datamodels to your application.
             */
            session = await DIDSession.authorize(authMethod, { resources: this.composeClient.resources })
            // Set the session in localStorage.
            localStorage.setItem(this.sessionKeyId, session.serialize())
        }

        // Set our Ceramic DID to be our session DID.
        this.composeClient.setDID(session.did)
        this.ceramic.did = session.did
        return
    }

    /**
     * Returns a public profile.
     * @param username Email, phone (E.164), or social handle (@<username>)
     * @param socialProvider Twitter, Discord, Facebook, Linkedin, or Twitch
     * @param numWallets Optional number of wallets to return
     * @returns
     */
    search = async (username: string, socialProvider?: SocialProviders, numWallets?: number) => {
        // Validate username
        if (
            (!socialProvider &&
                !username
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    )) ||
            !username.match(/^\+?[1-9]\d{1,14}$/)
        ) {
            throw new Error('Invalid email or phone')
        } else if (!username.toLowerCase().match(/^@?(\w){1,15}$/)) {
            throw new Error('Invalid social handle')
        }

        const formattedUsername = socialProvider ? username + `-${socialProvider}` : username.toLowerCase()

        try {
            // Fetch profileId
            const response = await WalletTreeApi(this.apiKey).profile.search(formattedUsername, 'id')
            const { profileId } = response

            // Fetch profile
            const profile: any = await this.composeClient.executeQuery(`
				query {
					node(id: "${profileId}") {
						... on WalletTreeProfile {
							id
							private
							createdAt
							updatedAt
							deletedAt
							wallets(first: "${numWallets || this.defaultNumWallets}") {
								edges {
									node {
										id
										address
										name
										description
										provider
										otherProvider
										chain
										otherChain
										primary
										private
										favorite
										createdAt
										updatedAt
										deletedAt
									}
								}
							}
						}
					}
				}`)
            return {
                profile: profile?.data?.viewer?.walletTreeProfile,
                wallets: profile?.data?.viewer?.walletTreeWalletList.edges.map((wallet: any) => wallet.node),
            }
        } catch (error) {
            // TODO: catch each exception - API and Ceramic
            throw new Error('Custom error')
        }
    }
}
