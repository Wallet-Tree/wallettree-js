import { walletSdk } from './services/sdk.wallet'
import { WalletTreeUrlArg } from '@wallettree/api-client'
import Web3 from 'web3'
import { sha3 } from 'web3-utils'

export const WalletTreeSDK = (args: {
  apiKey: string
  provider: any
  fromPrivateKey?: string
  url?: WalletTreeUrlArg
}) => {
  const web3 = new Web3(args.provider)

  if (args.fromPrivateKey) {
    web3.eth.accounts.wallet.add(args.fromPrivateKey)
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
  }

  // const contract = new web3.eth.Contract(ResolverContract.abi, walletSecrets.resolverContractAddress)

  const createPrimaryResolver = (identifier: string, wallets: any, allowServer: boolean) => {
    const hash = sha3(identifier)
    // const tx = contract.methods.createResolver(hash, 'cid', 'signature', allowServer)

    // tx.send({
    //   from: web3.eth.defaultAccount,
    //   gas: tx.estimateGas() * 2,
    // })
    //   .on('transactionHash', (txHash) => {})
    //   .on('error', (error, receipt) => {})
  }

  // updatePrimaryResolverCid() {},

  // enablePrimaryResolverAllowServer() {},

  // deletePrimaryResolver() {},

  // createSecondaryResolver() {},

  // deleteSecondaryResolver() {},
  return {
    wallet: walletSdk,
  }
}
