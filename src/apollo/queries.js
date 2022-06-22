import { gql } from "@apollo/client";




export const META_DATA = gql`
  query _meta {
    _meta {
      block {
        number
      }
      hasIndexingErrors
    }
  }
`

export const ETH_DATA = gql`
  query markets {
    markets (where: {underlyingSymbol: "ETH"}) {
      id
      underlyingPriceUSD
    }
  }
`

export const TOKENS_DATA = gql`
  query markets {
    markets (first: 10, orderBy: cash, orderDirection: desc) {
      cash
    }
  }
`

