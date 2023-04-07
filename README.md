![WalletTree Logo](https://uploads-ssl.webflow.com/63f909252c43c65e00558cdb/63fd1642a17891a4323fb2bb_LogoFull.png)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# 🌲 WalletTree-JS

Add global wallet discovery using 📧, ☎️, and @socials to your dApp. Let users share wallets with a single link and send/receive any crypto without ever touching an address.

## ⭐️ Features

-   Instant Lookup
-   Universal Link
-   Send/Receive Without Addresses
-   Chain Agnostic
-   Privacy Built In
-   Affordable

## 💾 Installation

Install with npm

```bash
  npm install @wallettree/wallettree-js
```

## 📝 Usage/Examples

```typescript
import { WalletTreeSDK } from '@wallettree/wallettree-js'

// Create SDK instance
const walletTree = new WalletTreeSDK({ apiKey: '<apiKey>' })
await walletTree.authenticate()
```

### Profile

```typescript
// Search a profile using email
const { profile, wallets } = await walletTree.search('joshua@wallettree.me')

// Search a profile using phone (E.164 format)
const { profile, wallets } = await walletTree.search('+11234567890')

// Search a profile using a social username
// Supported: twitter, discord, facebook, linkedin, twitch
const { profile, wallets } = await walletTree.search('@wallettreeme', 'twitter')

// Create a profile
const newProfile = await walletTree.profile.create('user-123')

// Get current profile
const myProfile = await walletTree.profile.me()

// Update profile privacy
const updatedProfile = await walletTree.profile.setPrivacy(true)
```

### Wallets

```typescript
// Add wallet to your profile
const wallet: Wallet = {
    address: '0x0000000000000000000000000000000000000000',
    name: 'My amazing wallet',
    description: 'For sending me money!',
    provider: WalletProvider.ETHEREUM,
    chain: WalletChain.METAMASK,
    primary: false,
    private: false,
    favorite: false,
}
const newWallet = await walletTree.wallets.create(wallet)

// Update a wallet
const updatedWallet = await walletTree.wallets.updateName(newWallet.id, 'For Vitalik')
await walletTree.wallets.updateDescription(newWallet.id, 'Because I love him')
await walletTree.wallets.updatePrimary(newWallet.id, true)
await walletTree.wallets.updatePrivacy(newWallet.id, true)
await walletTree.wallets.updateFavorite(newWallet.id, true)

// Delete a wallet
await walletTree.wallets.delete(wallet.id)
```

## 📚 Documentation

Everything you need to get started is here, but you can reference our full [Documentation](https://linktodocumentation) for additional information.

## 🔑 API Keys

### Development

To help you get up and running easily, we've created a shared `development` API key.

Development API Key: `b87uJJUd5i4EdmGpBOOZQ3RiRvbYpki72aMHwKrD`

**PLEASE** use this key respectfully as other developers and projects use it along with you.

### Production

When you're ready migrate to `production`, please [schedule a call with us](https://calendly.com/normalfinance/30min-meeting).

This short call will allow us to collect the few pieces of info we need to create your `production` API key, share our [Pricing](https://www.wallettree.me/pricing) plans with you, and answer any questions you may have.

## 📢 Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## ❓ Support & Feedback

If you have any feedback or support needs, please reach out to us at support@wallettree.me, or join our [Slack channel](https://linktodocumentation) for easier communication.

## 👋 Authors

-   [@jblewnormal](https://github.com/jblewnormal)

## 💼 License

[MIT](https://choosealicense.com/licenses/mit/)
