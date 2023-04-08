import { WalletTreeSDK } from '../sdk'

// types...
// import type { CancelablePromise } from '../generated/core/CancelablePromise'
import { request as __request } from '..//generated/core/request'

// Models
// import { PaymentRequest } from '../generated/models/PaymentRequest'
// import { PaymentSend } from '../generated/models/PaymentSend'

export class Payments extends WalletTreeSDK {
    /**
     * Creates a new Send payment.
     * @param args
     * @returns
     */
    send = async (): Promise<any> => {
        return 'Coming soon :)'
        // return __request({
        //     method: 'POST',
        //     path: `/payments/send`,
        //     headers: {
        //         // 'x-testnet-type': xTestnetType,
        //     },
        //     body: requestBody,
        //     mediaType: 'application/json',
        //     errors: {
        //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        //         500: `Internal server error. There was an error on the server while processing the request.`,
        //     },
        // })
    }
    /**
     * Creates a new Request payment.
     * @param args
     * @returns
     */
    request = async (): Promise<any> => {
        return 'Coming soon :)'
        // return __request({
        //     method: 'POST',
        //     path: `/payments/request`,
        //     headers: {},
        //     body: requestBody,
        //     mediaType: 'application/json',
        //     errors: {
        //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        //         500: `Internal server error. There was an error on the server while processing the request.`,
        //     },
        // })
    }
}
