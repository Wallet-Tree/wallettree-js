/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// types...
import type { CancelablePromise } from '../core/CancelablePromise'
import { request as __request } from '../core/request'

// Models
import { PaymentRequest } from '../models/PaymentRequest'
import { PaymentSend } from '../models/PaymentSend'

export class PaymentService {
    public static payments(id: string): CancelablePromise<any> | string {
        return 'Coming soon :)'
        // return __request({
        //     method: 'GET',
        //     path: '/payments',
        //     errors: {
        //         400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        //         401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        //         403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
        //         500: `Internal server error. There was an error on the server while processing the request.`,
        //     },
        // })
    }

    public static request(requestBody: PaymentRequest | {}): CancelablePromise<any> | string {
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

    public static send(requestBody: PaymentSend | {}): CancelablePromise<any> | string {
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
}
