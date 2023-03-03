import { Blockchain } from './Blockchain'
import {
  Currency,
  NativeCurrency,
} from '@wallettree/api-client'

export const BlockchainCurrencyMapping: Record<
  Blockchain,
  NativeCurrency | { nativeCurrency: NativeCurrency; currencies: Currency[] }
> = {
  BNB: Currency.BNB,
  BTC: Currency.BTC,
  LTC: Currency.LTC,
  KLAY: Currency.KLAY,
  DOGE: Currency.DOGE,
  BCH: Currency.BCH,
  SOL: Currency.SOL,
  HARMONY: Currency.ONE,
  EGLD: Currency.EGLD,
  XDC: Currency.XDC,
  XRP: Currency.XRP,
  XLM: Currency.XLM,
  VET: Currency.VET,
  NEO: Currency.NEO,
  ADA: Currency.ADA,
  ALGO: Currency.ALGO,
  KCS: Currency.KCS,
  [Blockchain.CELO]: Currency.BTC,
  [Blockchain.ETH]: Currency.BTC,
  [Blockchain.BSC]: Currency.BTC,
  [Blockchain.POLYGON]: Currency.BTC,
  [Blockchain.FLOW]: Currency.BTC,
  [Blockchain.TRON]: Currency.BTC
}

export const CurrencyToBlockchainMapping: Record<Currency, Blockchain> = buildCurrencyBlockchainMapping()
export const BlockchainToNativeCurrencyMapping: Record<Blockchain, NativeCurrency> =
  buildBlockchainDefaultCurrencyMapping()

function buildBlockchainDefaultCurrencyMapping(): Record<Blockchain, Currency> {
  return (Object.keys(BlockchainCurrencyMapping) as Blockchain[])
    .map((blockchain: Blockchain) => {
      const value = BlockchainCurrencyMapping[blockchain]
      if (typeof value === 'object') return { [blockchain]: value.nativeCurrency }
      return { [blockchain]: value }
    })
    .reduce(
      (obj, item) => ({
        ...obj,
        ...item,
      }),
      {},
    ) as Record<Blockchain, Currency>
}

function buildCurrencyBlockchainMapping(): Record<Currency, Blockchain> {
  return (Object.keys(BlockchainCurrencyMapping) as Blockchain[])
    .map((blockchain: Blockchain) => {
      const value = BlockchainCurrencyMapping[blockchain]

      if (typeof value === 'object') {
        return value.currencies.map((c) => ({
          [c]: blockchain,
        }))
      }

      return { [value]: blockchain }
    })
    .reduce(
      (obj, item) => ({
        ...obj,
        ...item,
      }),
      {},
    ) as Record<Currency, Blockchain>
}
