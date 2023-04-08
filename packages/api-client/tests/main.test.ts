// Modules
import { WalletTreeApi, WalletTreeApiType } from '../../../packages/api-client/src'

// Config
const apiKey = '53e0A4eH3f4Ypmq9QL6ya27CLEDEg0LKf44Idhcj'
const email = 'joshua@wallettre.me'

describe('WalletTreeSDK', () => {
    let walletTreeApi: WalletTreeApiType

    beforeAll(async () => {
        walletTreeApi = WalletTreeApi(apiKey)
    })

    describe('AuthService', () => {
        it('should send a verification code', async () => {
            const response = await walletTreeApi.auth.sendCode({
                email: email,
            })
            expect(response.data.success).toEqual(true)
        })
    })

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
            const response = await walletTreeApi.profile.search(email, 'id')
            expect(response.data.profileId).toBeTruthy()
        })

        it('should search for a profile using a social username', async () => {
            const twitterUsername = 'wallettreeme-twitter'
            const response = await walletTreeApi.profile.search(twitterUsername, 'id')
            expect(response.data.profileId).toBeTruthy()
        })
    })
})
