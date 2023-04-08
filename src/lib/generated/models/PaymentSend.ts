/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentSend = {
    contactMethod: 'EMAIL' | 'PHONE' | 'SOCIAL'
    identifier: string
    asset: string
    amount: string
    denomination: 'USD' | 'CRYPTO'
}
