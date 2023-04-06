import { WalletTreeSDK } from '../../../dist/packages/sdk/src'

describe('WalletTreeSDK', () => {
    describe('SDK', () => {
        it('should create a new SDK instance', async () => {
            expect(true).toEqual(1)
        })

        it('should authenticate the SDK instance', async () => {
            expect(true).toEqual(1)
        })

        it('should search for a profile using an email', async () => {
            expect(true).toEqual(1)
        })

        it('should search for a profile using a social username', async () => {
            expect(true).toEqual(1)
        })
    })

    describe('Profile', () => {
        let walletTree: WalletTreeSDK

        beforeAll(async () => {
            walletTree = new WalletTreeSDK({ apiKey: '', ceramicUrl: '' })
        })

        it('should create a new profile', async () => {
            expect(true).toEqual(1)
        })

        it('should update profile privacy', async () => {
            expect(true).toEqual(1)
        })
    })

    describe('Wallet', () => {
        let walletTree: WalletTreeSDK

        beforeAll(async () => {
            walletTree = new WalletTreeSDK({ apiKey: '', ceramicUrl: '' })
        })

        it('should create a new wallet', async () => {
            expect(true).toEqual(1)
        })

        it('should update a wallet name', async () => {
            expect(true).toEqual(1)
        })

        it('should update a wallet description', async () => {
            expect(true).toEqual(1)
        })

        it('should update a wallet primary status', async () => {
            expect(true).toEqual(1)
        })

        it('should update a wallet privacy', async () => {
            expect(true).toEqual(1)
        })

        it('should update a wallet favorite status', async () => {
            expect(true).toEqual(1)
        })

        it('should delete a wallet', async () => {
            expect(true).toEqual(1)
        })
    })
})
