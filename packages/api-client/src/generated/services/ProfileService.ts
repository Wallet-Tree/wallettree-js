/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// types...
import type { CancelablePromise } from '../core/CancelablePromise'
import { request as __request } from '../core/request'

// Models
import { ProfileCreate } from '../models/ProfileCreate'

export class ProfileService {
    public static search(username: string, returnType: 'id' | 'profile'): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: '/profile',
            query: {
                username: username,
                returnType: returnType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        })
    }

    public static create(requestBody: ProfileCreate): CancelablePromise<any> | string {
        return __request({
            method: 'POST',
            path: `/profile`,
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
