// Modules
import { WalletTreeSDK } from '../../../packages/sdk/src'

// Types
import { Wallet } from 'dist/packages/sdk/src/lib/models/Wallet'
import { WalletChain } from 'dist/packages/sdk/src/lib/models/WalletChain'
import { WalletProvider } from 'dist/packages/sdk/src/lib/models/WalletProvider'

// Config
const apiKey = '123'

describe('WalletTreeSDK', () => {
    let walletTree: WalletTreeSDK

    beforeAll(async () => {
        walletTree = new WalletTreeSDK({ apiKey: apiKey })
    })

    describe('SDK', () => {
        it('should create a new SDK instance', async () => {
            expect(walletTree.ceramic).toBeTruthy()
            expect(walletTree.composeClient).toBeTruthy()
        })

        it('should authenticate the SDK instance', async () => {
            await walletTree.authenticate()
            expect(walletTree.ceramic.did).toBeTruthy()
        })

        it('should search for a profile using an email', async () => {
            const email = 'joshua@wallettre.me'
            const { profile } = await walletTree.search(email)
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as email
            expect(profile.userId).toEqual(email)
        })

        it('should search for a profile using a social username', async () => {
            const twitterUsername = 'wallettreeme-twitter'
            const { profile } = await walletTree.search(twitterUsername)
            // TODO: this will fail as userId is an internal value to WalletTree and NOT the same as a social username
            expect(profile.userId).toEqual(twitterUsername)
        })
    })

    describe('Profile', () => {
        it('should create a new profile', async () => {
            const userId = 'abc123'
            const profile = await walletTree.profile.create(userId)
            expect(profile.userId).toEqual(userId)
        })

        it('should update profile privacy', async () => {
            const privacy = await walletTree.profile.me()
            const profile = await walletTree.profile.setPrivacy(!privacy)
            expect(profile.privacy).toEqual(!privacy)
        })
    })

    describe('Wallet', () => {
        let profile: any
        let newWallet

        beforeAll(async () => {
            profile = await walletTree.profile.me()
        })

        it('should create a new wallet', async () => {
            const wallet: Wallet = {
                address: '0x0000000000000000000000000000000000000000',
                name: 'Test name',
                description: 'Test description',
                provider: WalletProvider.ETHEREUM,
                chain: WalletChain.METAMASK,
                primary: false,
                private: false,
                favorite: false,
                // TODO: add createdAt, updatedAt?
            }
            newWallet = await walletTree.wallets.create(wallet)
            expect(newWallet.address).toEqual(wallet.address)
        })

        it('should update a wallet name', async () => {
            const name = 'For Vitalik'
            const wallet = await walletTree.wallets.updateName(newWallet.id, name)
            expect(wallet.name).toEqual(name)
        })

        it('should update a wallet description', async () => {
            const description = 'Because I love him'
            const wallet = await walletTree.wallets.updateDescription(newWallet.id, description)
            expect(wallet.description).toEqual(description)
        })

        it('should update a wallet primary status', async () => {
            const wallet = await walletTree.wallets.updatePrimary(newWallet.id, true)
            expect(wallet.primary).toEqual(true)
        })

        it('should update a wallet privacy', async () => {
            const wallet = await walletTree.wallets.updatePrivacy(newWallet.id, true)
            expect(wallet.privacy).toEqual(true)
        })

        it('should update a wallet favorite status', async () => {
            const wallet = await walletTree.wallets.updateFavorite(newWallet.id, true)
            expect(wallet.favorite).toEqual(true)
        })

        it('should delete a wallet', async () => {
            const wallet = await walletTree.wallets.delete(newWallet.id)
            expect(wallet.deletedAt).toBeTruthy()
        })
    })
})
