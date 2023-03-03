import { walletSdk } from './services/sdk.wallet'
import { WalletTreeUrlArg } from '@wallettree/api-client'

export const WalletTreeSDK = (args: { apiKey: string; url?: WalletTreeUrlArg }) => {
  return {
    wallet: walletSdk,
  }
}
