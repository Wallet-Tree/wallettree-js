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

    constructor(args: WalletTreeConfig) {
        if (!args.apiKey || !args.ceramicUrl) {
            throw new Error('WalletTree SDK missing argument(s)')
        }

        this.apiKey = args.apiKey
        this.ceramicUrl = args.ceramicUrl
        this.sessionKeyId = args.sessionKeyId || 'walletTreeDID'

        this.ceramic = new CeramicClient(args.ceramicUrl)
        this.composeClient = new ComposeClient({
            ceramic: args.ceramicUrl,
            definition: definition as RuntimeCompositeDefinition,
        })

        this.profile = new Profile(args)
        this.wallets = new Wallets(args)
    }

    authenticate = async (customProvider?: any) => {
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
            const ethProvider = customProvider || window.ethereum
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
     * @param username
     * @param numWallets
     * @returns
     */
    search = async (username: string, numWallets?: number) => {
        // Validate username
        if (
            !username
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ) ||
            !username
                .toLowerCase()
                .match(/(?<=[^\/]|^)[A-Za-z0-9_.]{3,25}-(facebook|twitter|discord|linkedin|twitch)$/)
        ) {
            throw new Error('Invalid username')
        }

        try {
            // Fetch profileId
            const response = await WalletTreeApi(this.apiKey).search.search(username)
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
