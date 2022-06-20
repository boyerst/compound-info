import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";




export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
  }),
  cache: new InMemoryCache(),
})