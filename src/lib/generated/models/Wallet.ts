/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { WalletChain } from './WalletChain'
import { WalletProvider } from './WalletProvider'

export type Wallet = {
    /**
     * The currency of the virtual account
     */
    address: string
    /**
     * If set to "true", the virtual account is frozen
     */
    name: string
    /**
     * If set to "true", the virtual account is active
     */
    description: string
    /**
     * The ID of the customer (newly created or existing one) associated with the virtual account
     */
    provider: WalletProvider
    otherProvider?: string
    /**
     * The number associated with the virtual account in an external system
     */
    chain: WalletChain
    otherChain?: string
    /**
     * The code associated with the virtual account in an external system to designate the purpose of the account in bookkeeping
     */
    primary: boolean
    private: boolean
    favorite: boolean
}
