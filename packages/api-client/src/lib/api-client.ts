import {
  IpfsService,
  PaymentService,
  ResolverService,
  SearchService,
} from '../generated'
import { OpenAPI } from '../generated/core/OpenAPI'

export type WalletTreeApiType = ReturnType<typeof WalletTreeApi>

export type WalletTreeUrlArg = string

export const WALLETTREE_API_CONSTANTS = {
  URL: 'https://prod.normalapi.com',
  HEADER_API_KEY: 'x-api-key',
  NODE_TYPE_KEY: 'x-node-type',
  API_VERSION: 'v1',
  API_KEY: '',
  TRON_PRO_API_KEY: '',
}

export function WalletTreeApi(apiKey: string, url: string = WALLETTREE_API_CONSTANTS.URL) {
  OpenAPI.HEADERS = { [WALLETTREE_API_CONSTANTS.HEADER_API_KEY]: apiKey }
  OpenAPI.BASE = process.env['WALLETTREE_API_URL'] ?? url

  // @TODO
  WALLETTREE_API_CONSTANTS.API_KEY = apiKey

  return ApiServices
}

// export type EvmBasedApiService = EthereumService

export const ApiServices = {
  ipfs: IpfsService,
  payments: PaymentService,
  resolver: ResolverService,
  search: SearchService,
}
