// Modules
import { WalletTreeApi } from '../../../packages/api-client/src'

// Config
const apiKey = '123'

describe('WalletTreeSDK', () => {
    let walletTreeApi: any

    beforeAll(async () => {
        walletTreeApi = WalletTreeApi(apiKey)
    })

    describe('SearchService', () => {
        it('should search for a profile using an email', async () => {
            const email = 'joshua@wallettre.me'
            const response = await walletTreeApi.search.search(email)
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as email
            expect(response.data.profile.userId).toEqual(email)
        })

        it('should search for a profile using a social username', async () => {
            const twitterUsername = 'wallettreeme-twitter'
            const response = await walletTreeApi.search.search(twitterUsername)
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as a social username
            expect(response.data.profile.userId).toEqual(twitterUsername)
        })
    })

    describe('PaymentsService', () => {
        it("should get a user's payments", async () => {
            const response = await walletTreeApi.payments.payments()
            expect(response).toEqual('Coming soon :)')
        })

        it('should create a request payment', async () => {
            const response = await walletTreeApi.payments.request()
            expect(response).toEqual('Coming soon :)')
        })

        it('should create a send payment', async () => {
            const response = await walletTreeApi.payments.send()
            expect(response).toEqual('Coming soon :)')
        })
    })
})
