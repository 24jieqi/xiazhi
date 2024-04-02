import type { ApolloLink } from '@apollo/client'
import { ApolloClient, InMemoryCache, HttpLink, concat } from '@apollo/client'

import type { ErrorLinkConfig } from './link/error'
import makeErrorLink from './link/error'
import type { RefreshTokenLinkConfig } from './link/refresh-token'
// import makeRefreshTokenLink from './link/refresh-token'
import type { SetTokenLinkConfig } from './link/token'
import makeSetTokenLink from './link/token'

const httpLink = new HttpLink({
  uri: '/graphql',
})

export default function makeApolloClient(
  config: ErrorLinkConfig & RefreshTokenLinkConfig & SetTokenLinkConfig,
  tailLink?: ApolloLink,
) {
  const withToken = makeSetTokenLink({ getToken: config.getToken })
  const errorLink = makeErrorLink({
    onGraphqlError: config.onGraphqlError,
    onNetworkError: config.onNetworkError,
  })
  // const refreshTokenLink = makeRefreshTokenLink({
  //   getToken: config.getToken,
  //   setToken: config.setToken,
  // })
  return new ApolloClient({
    link: tailLink
      ? concat(tailLink, concat(withToken, concat(errorLink, httpLink)))
      : concat(withToken, concat(errorLink, httpLink)),
    cache: new InMemoryCache({
      // 去掉 __typename
      addTypename: false,
    }),
    defaultOptions: {
      // 禁用缓存
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'network-only',
      },
    },
  })
}
