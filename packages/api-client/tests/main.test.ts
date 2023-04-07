// Modules
import { WalletTreeApi, WalletTreeApiType } from '../../../packages/api-client/src'

// Config
const apiKey = '123'

describe('WalletTreeSDK', () => {
    let walletTreeApi: WalletTreeApiType

    beforeAll(async () => {
        walletTreeApi = WalletTreeApi(apiKey)
    })

    describe('AuthService', () => {})

    describe('PaymentsService', () => {
        it("should get a user's payments", async () => {
            const response = await walletTreeApi.payments.payments('123')
            expect(response).toEqual('Coming soon :)')
        })

        it('should create a request payment', async () => {
            const response = await walletTreeApi.payments.request({})
            expect(response).toEqual('Coming soon :)')
        })

        it('should create a send payment', async () => {
            const response = await walletTreeApi.payments.send({})
            expect(response).toEqual('Coming soon :)')
        })
    })

    describe('ProfileService', () => {
        it('should search for a profile using an email', async () => {
            const email = 'joshua@wallettre.me'
            const response = await walletTreeApi.profile.search(email, 'profile')
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as email
            expect(response.data.profile.userId).toEqual(email)
        })

        it('should search for a profile using a social username', async () => {
            const twitterUsername = 'wallettreeme-twitter'
            const response = await walletTreeApi.profile.search(twitterUsername, 'profile')
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as a social username
            expect(response.data.profile.userId).toEqual(twitterUsername)
        })
    })
})
