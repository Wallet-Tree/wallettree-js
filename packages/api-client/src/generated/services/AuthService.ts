/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// types...
import type { CancelablePromise } from '../core/CancelablePromise'
import { request as __request } from '../core/request'

// Models
import { SendCode } from '../models/SendCode'
import { VerifyCode } from '../models/VerifyCode'

export class AuthService {
    public static sendCode(requestBody: SendCode): CancelablePromise<any> | string {
        return __request({
            method: 'POST',
            path: `/auth/code/send`,
            headers: {},
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        })
    }

    public static verifyCode(requestBody: VerifyCode): CancelablePromise<any> | string {
        return __request({
            method: 'POST',
            path: `/auth/code/send`,
            headers: {},
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        })
    }
}
