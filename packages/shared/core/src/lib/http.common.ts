import axios from 'axios'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'
import { fetchAdapter, WALLETTREE_API_CONSTANTS } from '@wallettree/api-client'
import { blockchainHelper } from './blockchain.common'

const EndpointsMapping: Record<Blockchain, string> = {
  HARMONY: 'one',
  BTC: 'bitcoin',
  DOGE: 'dogecoin',
  EGLD: 'egld',
  FLOW: 'flow',
  LTC: 'litecoin',
  NEO: 'neo',
  POLYGON: 'polygon',
  SOL: 'solana',
  TRON: 'tron',
  VET: 'vet',
  XRP: 'xrp',
  ETH: 'ethereum',
  CELO: 'celo',
  BSC: 'bsc',
  ALGO: 'algorand',
  ADA: 'ada',
  BCH: 'bcash',
  XDC: 'xdc',
  XLM: 'xlm',
  KCS: 'kcs',
  KLAY: 'klaytn',
  BNB: 'bnb',
}

const isWebWorker =
  typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope'

export const httpHelper = {
  get: axios.get,
  post: axios.post,
  axios: axios.create({ adapter: isWebWorker ? fetchAdapter : undefined }),
  CancelToken: axios.CancelToken,
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${WALLETTREE_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
  rpcEndpoint: (blockchain: Blockchain, url: string, apiKey: string) => {
    const chain = blockchainHelper.getDefaultCurrencyByBlockchain(blockchain)
    return `${url}/${WALLETTREE_API_CONSTANTS.API_VERSION}/blockchain/node/${chain}/${apiKey}`
  },
}
