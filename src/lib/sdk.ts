// Modules
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ComposeClient } from '@composedb/client'
import { DIDSession } from 'did-session'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { definition } from './generated/definition.js'

// Types
import { RuntimeCompositeDefinition } from '@composedb/types'
import type { CeramicApi } from '@ceramicnetwork/common'
import { WalletTreeConfig } from './generated/models/WalletTreeConfig.js'
import { SocialProviders } from './generated/models/SocialProviders.js'
import { Wallet } from './generated/models/Wallet.js'
import { SendCode } from './generated/models/SendCode.js'

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

    profileId: string

    profile: {
        me: (numWallets?: number) => Promise<any>
        create: (userId: string, privacy?: boolean) => Promise<any>
        setPrivacy: (privacy: boolean, profileId?: string) => Promise<any>
    }
    wallets: {
        create: (wallet: Wallet, profileId?: string) => Promise<any>
        updateName: (walletId: string, name: string) => Promise<any>
        updateDescription: (walletId: string, description: string) => Promise<any>
        updatePrimary: (walletId: string, primary: boolean) => Promise<any>
        updatePrivacy: (walletId: string, privacy: boolean) => Promise<any>
        updateFavorite: (walletId: string, favorite: boolean) => Promise<any>
        delete: (walletId: string) => Promise<any>
    }
    auth: { sendCode: (args: SendCode) => Promise<any> }
    payments: { send: () => Promise<any>; request: () => Promise<any> }

    /**
     * Creates a new WalletTreeSDK instance.
     * @param args SDK configuration
     */
    constructor(args: WalletTreeConfig) {
        if (!args.apiKey) {
            throw new Error('WalletTreeSDK requires an API key')
        }

        this.apiKey = args.apiKey
        this.ceramicUrl = args.ceramicUrl || process.env['WALLETTREE_CERAMIC_URL'] || ''
        this.sessionKeyId = args.sessionKeyId || 'walletTreeDID'

        this.ceramic = new CeramicClient(this.ceramicUrl)
        this.composeClient = new ComposeClient({
            ceramic: this.ceramicUrl,
            definition: definition as RuntimeCompositeDefinition,
        })

        this.profileId = ''

        this.profile = {
            me: this.me,
            create: this.createProfile,
            setPrivacy: this.setProfilePrivacy,
        }
        this.wallets = {
            create: this.createWallet,
            updateName: this.updateWalletName,
            updateDescription: this.updateWalletDescription,
            updatePrimary: this.updateWalletPrimary,
            updatePrivacy: this.updateWalletPrivacy,
            updateFavorite: this.updateWalletFavorite,
            delete: this.deleteWallet,
        }
        this.auth = {
            sendCode: this.sendVerificationCode,
        }
        this.payments = {
            send: this.createSendPayment,
            request: this.createRequestPayment,
        }
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

        const formattedUsername = socialProvider
            ? username.substring(1) + `-${socialProvider}`
            : username.toLowerCase()

        try {
            // Fetch profileId
            // const response: any = await __request({
            //     method: 'GET',
            //     path: '/profile',
            //     query: {
            //         username: formattedUsername,
            //         returnType: 'returnType',
            //     },
            //     errors: {
            //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
            //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
            //         403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
            //         500: `Internal server error. There was an error on the server while processing the request.`,
            //     },
            // })
            // const { profileId } = response
            const profileId = ''

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

    /**
     * PROFILE METHODS
     */

    /**
     * Returns the authenticated users profile.
     * @param numWallets Optional number of wallets to return
     * @returns
     */
    me = async (numWallets?: number): Promise<any> => {
        try {
            const profile: any = await this.composeClient.executeQuery(`
				query {
					viewer {
						walletTreeWalletList(first: "${numWallets || this.defaultNumWallets}") {
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
						walletTreeProfile {
							id
							userId
							private
							createdAt
							updatedAt
							deletedAt
						}
					}
				}`)

            this.profileId = profile?.data?.viewer?.walletTreeProfile?.id

            return {
                profile: profile?.data?.viewer?.walletTreeProfile,
                wallets: profile?.data?.viewer?.walletTreeWalletList.edges.map((wallet: any) => wallet.node),
            }
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Creates a new profile for the authenticated wallet.
     * @param userId Unique user identifier
     * @param privacy Initial profile privacy setting
     * @returns
     */
    createProfile = async (userId: string, privacy: boolean = false): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const now = Date.now().toString()
            const create: any = await this.composeClient.executeQuery(`
			mutation {
				createWalletTreeProfile(input: {
					content: {
					userId: "${userId}"
					private: ${privacy}
					createdAt: "${now}"
					updatedAt: "${now}"
					}
				}) 
				{
					document {
						id
						userId
						private
						createdAt
						updatedAt
						deletedAt
					}
				}
			}`)

            this.profileId = create?.data?.createWalletTreeProfile?.document?.id

            return create?.data?.createWalletTreeProfile.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Updates the authenticated wallet's profile privacy.
     * @param privacy New profile privacy setting
     * @param profileId Optional profile override
     * @returns
     */
    setProfilePrivacy = async (privacy: boolean, profileId?: string): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeProfile(input: {
					id: "${profileId || this.profileId}" 
					content: {
						private: ${privacy}
						updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
					id
					userId
					private
					createdAt
					updatedAt
					deletedAt
					}
				}
			}
      `)
            return update?.data?.updateWalletTreeProfile.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * WALLET METHODS
     */

    /**
     * Adds a wallet to the authenticated wallet's profile.
     * @param wallet New wallet to create
     * @param profileId Optional profile override
     * @returns
     */
    createWallet = async (wallet: Wallet, profileId?: string): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const now = Date.now().toString()
            const create: any = await this.composeClient.executeQuery(`
			mutation {
				createWalletTreeWallet(input: {
					content: {
						profileID: "${profileId || this.profileId}" 
						address: "${wallet.address}"
						name: "${wallet.name}"
						description: "${wallet.description}"
						provider:
						${
                            wallet.provider.toUpperCase() === 'OTHER'
                                ? wallet.otherProvider
                                : wallet.provider.toUpperCase().replace(/ /g, '_').replace(/\./g, '_')
                        }
						chain:
							${
                                wallet.chain.toUpperCase() === 'OTHER'
                                    ? wallet.otherChain
                                    : wallet.chain.toUpperCase().replace(/ /g, '_').replace(/\./g, '_')
                            }
						primary: ${wallet.primary}
						private: ${wallet.private}
						favorite: ${wallet.favorite}
						createdAt: "${now}"
						updatedAt: "${now}"
					}
				}) 
				{
					document {
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
		`)
            return create?.data?.createWalletTreeWallet.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Updates the name of a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to update
     * @param name New wallet name
     * @returns
     */
    updateWalletName = async (walletId: string, name: string): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					name: "${name}"
					updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
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
		`)
            return update?.data?.updateWalletTreeWallet.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Updates the description of a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to update
     * @param description New wallet description
     * @returns
     */
    updateWalletDescription = async (walletId: string, description: string): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					description: "${description}"
					updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
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
		`)
            return update?.data?.updateWalletTreeWallet.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Updates the primary status of a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to update
     * @param primary New wallet primary status
     * @returns
     */
    updateWalletPrimary = async (walletId: string, primary: boolean): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					primary: ${primary}
					updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
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
		`)
            return update?.data?.updateWalletTreeWallet.document
        } catch (error) {
            throw new Error('Custom error')
        }
    }

    /**
     * Updates the privacy of a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to update
     * @param privacy New wallet privacy
     * @returns
     */
    updateWalletPrivacy = async (walletId: string, privacy: boolean): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					private: ${privacy}
					updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
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
		`)
        return update?.data?.updateWalletTreeWallet.document
    }

    /**
     * Updates the favorite status of a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to update
     * @param favorite New wallet favorite status
     * @returns
     */
    updateWalletFavorite = async (walletId: string, favorite: boolean): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const update: any = await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					favorite: ${favorite}
					updatedAt: "${Date.now().toString()}"
					}
				}) 
				{
					document {
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
		`)
        return update?.data?.updateWalletTreeWallet.document
    }

    /**
     * Deletes a wallet from the authenticated wallet's profile.
     * @param walletId Wallet to delete
     * @returns
     */
    deleteWallet = async (walletId: string): Promise<any> => {
        if (this.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const now = Date.now().toString()
        await this.composeClient.executeQuery(`
			mutation {
				updateWalletTreeWallet(input: {
					id: "${walletId}"
					content: {
					updatedAt: "${now}"
					deletedAt: "${now}"
					}
				}) 
				{
					document {
						id
						deletedAt
					}
				}
			}
		`)
        return true
    }

    /**
     * PAYMENT METHODS
     */

    /**
     * Creates a new Send payment.
     * @param args
     * @returns
     */
    createSendPayment = async (): Promise<any> => {
        return 'Coming soon :)'
        // return __request({
        //     method: 'POST',
        //     path: `/payments/send`,
        //     headers: {
        //         // 'x-testnet-type': xTestnetType,
        //     },
        //     body: requestBody,
        //     mediaType: 'application/json',
        //     errors: {
        //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        //         500: `Internal server error. There was an error on the server while processing the request.`,
        //     },
        // })
    }
    /**
     * Creates a new Request payment.
     * @param args
     * @returns
     */
    createRequestPayment = async (): Promise<any> => {
        return 'Coming soon :)'
        // return __request({
        //     method: 'POST',
        //     path: `/payments/request`,
        //     headers: {},
        //     body: requestBody,
        //     mediaType: 'application/json',
        //     errors: {
        //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        //         500: `Internal server error. There was an error on the server while processing the request.`,
        //     },
        // })
    }

    /**
     * AUTH METHODS
     */

    /**
     * Sends a 5 minute valid OTP via email to authenticate a new user.
     * @param args
     * @returns
     */
    sendVerificationCode = async (args: SendCode): Promise<any> => {
        return 'Coming soon'
    }
}
