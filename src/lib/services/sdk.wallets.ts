import { WalletTreeSDK } from '../sdk'

// Models
import { Wallet } from '../generated/models/Wallet.js'

export class Wallets extends WalletTreeSDK {
    /**
     * Adds a wallet to the authenticated wallet's profile.
     * @param wallet New wallet to create
     * @param profileId Optional profile override
     * @returns
     */
    create = async (wallet: Wallet, profileId?: string): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const now = Date.now().toString()
            const create: any = await super.composeClient.executeQuery(`
			mutation {
				createWalletTreeWallet(input: {
					content: {
						profileID: "${profileId || super.profileId}" 
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
    updateName = async (walletId: string, name: string): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await super.composeClient.executeQuery(`
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
    updateDescription = async (walletId: string, description: string): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await super.composeClient.executeQuery(`
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
    updatePrimary = async (walletId: string, primary: boolean): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await super.composeClient.executeQuery(`
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
    updatePrivacy = async (walletId: string, privacy: boolean): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const update: any = await super.composeClient.executeQuery(`
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
    updateFavorite = async (walletId: string, favorite: boolean): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const update: any = await super.composeClient.executeQuery(`
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
    delete = async (walletId: string): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        const now = Date.now().toString()
        await super.composeClient.executeQuery(`
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
}
