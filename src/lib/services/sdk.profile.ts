import { WalletTreeSDK } from '../sdk'
import { request as __request } from '../generated/core/request'

export class Profile extends WalletTreeSDK {
    /**
     * Returns the authenticated users profile.
     * @param numWallets Optional number of wallets to return
     * @returns
     */
    me = async (numWallets?: number): Promise<any> => {
        try {
            const profile: any = await super.composeClient.executeQuery(`
				query {
					viewer {
						walletTreeWalletList(first: "${numWallets || super.defaultNumWallets}") {
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

            super.profileId = profile?.data?.viewer?.walletTreeProfile?.id

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
    create = async (userId: string, privacy: boolean = false): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const now = Date.now().toString()
            const create: any = await super.composeClient.executeQuery(`
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

            super.profileId = create?.data?.createWalletTreeProfile?.document?.id

            return create?.data?.createWalletTreeProfile.document


			return __request({
				method: 'POST',
				path: `/profile`,
				headers: {},
				body: {},
				mediaType: 'application/json',
				errors: {
					400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
					401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
					500: `Internal server error. There was an error on the server while processing the request.`,
				},
			})
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
    setPrivacy = async (privacy: boolean, profileId?: string): Promise<any> => {
        if (super.ceramic.did === undefined) throw new Error('Missing authenticated DID session')

        try {
            const update: any = await super.composeClient.executeQuery(`
			mutation {
				updateWalletTreeProfile(input: {
					id: "${profileId || super.profileId}" 
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
}
