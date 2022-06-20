import { gql } from "@apollo/client";




export const META_DATA = gql`
  query _meta {
    _meta {
      block {
        number
      }
    }
  }
`


