/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrimaryResolver } from '../models/PrimaryResolver';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ResolverService {

    /**
     * Count of found entities for get accounts request
     * <h4>1 credit per API call.</h4><br/><p>Count of accounts that were found from /v3/ledger/account</p>
     * @param pageSize Max number of items per page is 50.
     * @param page Page number
     * @param sort Direction of sorting. Can be asc or desc
     * @param sortBy Sort by
     * @param active Filter only active or non active accounts
     * @param onlyNonZeroBalance Filter only accounts with non zero balances
     * @param frozen Filter only frozen or non frozen accounts
     * @param currency Filter by currency
     * @param accountNumber Filter by account number
     * @returns EntitiesCount OK
     * @throws ApiError
     */
    public static createPrimaryResolver(
        requestBody: (any),
    ): CancelablePromise<PrimaryResolver> {
        return __request({
            method: 'POST',
            path: `/v1/resolver/primary`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    public static updatePrimaryResolverCid(
        requestBody: (any),
    ): CancelablePromise<PrimaryResolver> {
        return __request({
            method: 'PATCH',
            path: `/v1/resolver/primary/cid`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    public static deletePrimaryResolver(
        requestBody: (any),
    ): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/v1/resolver/primary`,
            // body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    public static createSecondaryResolver(
        requestBody: (any),
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v1/resolver/secondary`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    public static deleteSecondaryResolver(
        requestBody: (any),
    ): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/v1/resolver/secondary`,
            // body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }
}