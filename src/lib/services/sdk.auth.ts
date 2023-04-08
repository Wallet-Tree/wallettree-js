import { WalletTreeSDK } from '../sdk'

// import type { CancelablePromise } from '../generated/core/CancelablePromise'
import { request as __request } from '../generated/core/request'

// Models
import { SendCode } from '../generated/models/SendCode'

export class Auth extends WalletTreeSDK {
    /**
     * Sends a 5 minute valid OTP via email to authenticate a new user.
     * @param args
     * @returns
     */
    sendCode = async (args: SendCode): Promise<any> => {
        return __request({
            method: 'POST',
            path: `/auth/code/send`,
            headers: {},
            body: args,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        })
    }
}
