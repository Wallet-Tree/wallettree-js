/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentRequest = {
    recipientEmail: string
    asset: string
    amount: string
    denomination: 'USD' | 'CRYPTO'
}
