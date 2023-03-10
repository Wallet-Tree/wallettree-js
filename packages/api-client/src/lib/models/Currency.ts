export enum Currency {
  BTC = 'BTC',
  AVAX = 'AVAX',
  FTM = 'FTM',
  REVV = 'REVV',
  SAND = 'SAND',
  ADA = 'ADA',
  BCH = 'BCH',
  BNB = 'BNB',
  LTC = 'LTC',
  ONE = 'ONE',
  ETH = 'ETH',
  EGLD = 'EGLD',
  MATIC = 'MATIC',
  GAMEE = 'GAMEE',
  MATIC_ETH = 'MATIC_ETH',
  USDC_MATIC = 'USDC_MATIC',
  USDC_BSC = 'USDC_BSC',
  USDC_SOL = 'USDC_SOL',
  RMD = 'RMD',
  GMC = 'GMC',
  GMC_BSC = 'GMC_BSC',
  CELO = 'CELO',
  COIIN = 'COIIN',
  COIIN_BSC = 'COIIN_BSC',
  CUSD = 'CUSD',
  CEUR = 'CEUR',
  FLOW = 'FLOW',
  FUSD = 'FUSD',
  BSC = 'BSC',
  XDC = 'XDC',
  DOGE = 'DOGE',
  XRP = 'XRP',
  XLM = 'XLM',
  USDT = 'USDT',
  TRON = 'TRON',
  LEO = 'LEO',
  LINK = 'LINK',
  LISK = 'LISK',
  FREE = 'FREE',
  MKR = 'MKR',
  USDC = 'USDC',
  UNI = 'UNI',
  BAT = 'BAT',
  TUSD = 'TUSD',
  PAX = 'PAX',
  PLTC = 'PLTC',
  XCON = 'XCON',
  MMY = 'MMY',
  PAXG = 'PAXG',
  VET = 'VET',
  HAG = 'HAG',
  BETH = 'BETH',
  BUSD = 'BUSD',
  BBTC = 'BBTC',
  BADA = 'BADA',
  WBNB = 'WBNB',
  BDOT = 'BDOT',
  BXRP = 'BXRP',
  BLTC = 'BLTC',
  BBCH = 'BBCH',
  CAKE = 'CAKE',
  BUSD_BSC = 'BUSD_BSC',
  B2U_BSC = 'B2U_BSC',
  WBTC = 'WBTC',
  USDT_TRON = 'USDT_TRON',
  USDT_MATIC = 'USDT_MATIC',
  LATOKEN = 'LATOKEN',
  INRT_TRON = 'INRT_TRON',
  ALGO = 'ALGO',
  SOL = 'SOL',
  KCS = 'KCS',
  NEO = 'NEO',
  KLAY = 'KLAY',
  EOS = 'EOS',
  ARB = 'ARB',
  OPTIMISM = 'OPTIMISM',
  NEAR = 'NEAR',
  CRO = 'CRO',
  RSK = 'RSK',
  AURORA = 'AURORA',
  GNO = 'GNO',
  DOT = 'DOT',
  KSM = 'KSM',
  OASIS = 'OASIS',
  TEZOS = 'TEZOS',
  PALM = 'PALM',
  GLMR = 'GLMR',
  INTENT = 'INTENT',
  EURTENT = 'EURTENT',
  GOLDAX = 'GOLDAX',
  ZCASH = 'ZCASH',
  ZIL = 'ZIL',
}

export const ERC20_CURRENCIES = [
  Currency.USDT,
  Currency.LEO,
  Currency.LINK,
  Currency.UNI,
  Currency.MATIC_ETH,
  Currency.BUSD,
  Currency.SAND,
  Currency.REVV,
  Currency.LATOKEN,
  Currency.COIIN,
  Currency.FREE,
  Currency.XCON,
  Currency.MKR,
  Currency.USDC,
  Currency.BAT,
  Currency.GMC,
  Currency.TUSD,
  Currency.PAX,
  Currency.PLTC,
  Currency.MMY,
  Currency.PAXG,
  Currency.WBTC,
]

export const NATIVE_CURRENCIES = [
  Currency.BTC,
  Currency.ONE,
  Currency.ADA,
  Currency.BNB,
  Currency.FLOW,
  Currency.BSC,
  Currency.XDC,
  Currency.LTC,
  Currency.DOGE,
  Currency.TRON,
  Currency.BCH,
  Currency.ETH,
  Currency.XRP,
  Currency.XLM,
  Currency.CELO,
  Currency.MATIC,
  Currency.VET,
  Currency.EGLD,
  Currency.ALGO,
  Currency.SOL,
  Currency.KCS,
  Currency.KLAY,
]

export type NativeCurrency = typeof NATIVE_CURRENCIES[number]
