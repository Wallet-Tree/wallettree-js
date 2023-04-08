/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WalletTreeInterfaceProfile = {
    /**
     * The currency of the virtual account
     */
    get: (numWallets?: number) => Promise<any>
    /**
     * The currency of the virtual account
     */
    create: (userId: string) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setPrivacy: (privacy: boolean) => Promise<any>
}
