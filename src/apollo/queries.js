import { gql } from "@apollo/client";




export const META_DATA = gql`
  query metaData {
    _meta {
      block {
        number
      }
      hasIndexingErrors
    }
  }
`

export const ETH_DATA = gql`
  query ethData {
    markets (where: {underlyingSymbol: "ETH"}) {
      id
      underlyingPriceUSD
    }
  }
`

export const TOKENS_DATA = gql`
  query tokensData {
    markets (orderBy: cash, orderDirection: desc) {
      id
      cash
      name
      symbol
      underlyingSymbol
      underlyingName
      underlyingPriceUSD  
      supplyRate
      borrowRate
      totalBorrows
      borrowIndex
    }
  }
`


export const LIQUIDATIONS_DATA = gql`
  query liquidationsData {
    liquidationEvents (first: 100, orderBy: blockTime, orderDirection: desc) {
      blockTime
      from
      amount
      cTokenSymbol
      to
      underlyingRepayAmount
      underlyingSymbol
      id
    }
  }
`


export const BORROWS_DATA = gql`  
  query borrowsData {
    borrowEvents (first: 10, orderBy: blockTime, orderDirection: desc, where: {amount_gte: 100000}) {
      blockTime
      borrower
      amount
      underlyingSymbol
      id
      accountBorrows
    }
  }
`














