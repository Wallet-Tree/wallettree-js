/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Wallet } from './Wallet'

export type WalletTreeInterfaceWallet = {
    /**
     * The currency of the virtual account
     */
    create: (profileId: string, wallet: Wallet) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setName: (walletId: string, name: string) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setDescription: (walletId: string, description: string) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setPrimary: (walletId: string, primary: boolean) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setPrivacy: (walletId: string, _private: boolean) => Promise<any>
    /**
     * The currency of the virtual account
     */
    setFavorite: (walletId: string, favorite: boolean) => Promise<any>
    /**
     * The currency of the virtual account
     */
    delete: (walletId: string) => Promise<any>
}
