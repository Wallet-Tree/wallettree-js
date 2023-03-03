/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// types...
import type { CancelablePromise } from '../core/CancelablePromise'
import { request as __request } from '../core/request'

export class SearchService {
  public static getProfile(id: string): CancelablePromise<any> {
    return __request({
      method: 'GET',
      path: `/v1/profile/${id}`,
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server while processing the request.`,
      },
    })
  }
}
