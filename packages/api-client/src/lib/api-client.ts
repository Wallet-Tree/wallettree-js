import { AuthService, PaymentService, ProfileService } from '../generated'
import { OpenAPI } from '../generated/core/OpenAPI'

export type WalletTreeApiType = ReturnType<typeof WalletTreeApi>

export type WalletTreeUrlArg = string

export const WALLETTREE_API_CONSTANTS = {
    URL: 'https://api.wallettree.me',
    HEADER_API_KEY: 'x-api-key',
    NODE_TYPE_KEY: 'x-node-type',
    API_VERSION: 'v1',
    API_KEY: '',
    TRON_PRO_API_KEY: '',
}

export function WalletTreeApi(apiKey: string) {
    OpenAPI.HEADERS = { [WALLETTREE_API_CONSTANTS.HEADER_API_KEY]: apiKey }
    OpenAPI.BASE =
        process.env['WALLETTREE_API_URL'] ??
        WALLETTREE_API_CONSTANTS.URL + '/' + WALLETTREE_API_CONSTANTS.API_VERSION

    // @TODO
    WALLETTREE_API_CONSTANTS.API_KEY = apiKey

    return ApiServices
}

// export type EvmBasedApiService = EthereumService

export const ApiServices = {
    auth: AuthService,
    payments: PaymentService,
    profile: ProfileService,
}
