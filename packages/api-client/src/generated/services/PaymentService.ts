/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// types...
import type { CancelablePromise } from '../core/CancelablePromise'
import { request as __request } from '../core/request'

export class PaymentService {
  public static getPayments(id: string): CancelablePromise<any> {
    return __request({
      method: 'GET',
      path: '/v1/payments',
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server while processing the request.`,
      },
    })
  }

  public static requestCrypto(
    requestBody: any,
    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
  ): CancelablePromise<any> {
    return __request({
      method: 'POST',
      path: `/v1/payments/request`,
      headers: {
        'x-testnet-type': xTestnetType,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        500: `Internal server error. There was an error on the server while processing the request.`,
      },
    })
  }

  public static sendCrypto(
    requestBody: any,
    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
  ): CancelablePromise<any> {
    return __request({
      method: 'POST',
      path: `/v1/payments/send`,
      headers: {
        'x-testnet-type': xTestnetType,
      },
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
