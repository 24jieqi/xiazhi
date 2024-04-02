// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

import { sleep } from '@/utils'

import type { GetToken } from './base'
import { getRefreshTokenLink } from './base'

/**
 * 创建一个单独的客户端
 */
// const refreshTokenApiClient = new ApolloClient({
//   link: createHttpLink({
//     uri: '/graphql',
//     headers: {
//       Authorization: '',
//     },
//   }),
//   cache: new InMemoryCache(),
//   credentials: 'include',
// })

export type RefreshTokenLinkConfig = {
  getToken: GetToken
  setToken: (newToken: string) => void
}

export default function makeRefreshTokenLink({
  getToken,
  setToken,
}: RefreshTokenLinkConfig) {
  /**
   * 调用接口刷新token
   * @param token
   * @returns
   */
  async function refreshToken(_token: string) {
    // const res = await refreshTokenApiClient.mutate<RefreshTokenMutation>({
    //   mutation: RefreshTokenDocument,
    //   context: {
    //     headers: {
    //       Authorization: token,
    //     },
    //   },
    // })
    // const newToken = res.data?.refreshToken?.token
    const newToken = await sleep<string>(500, 'newToken' + Date.now())
    setToken(newToken)
    return newToken
  }
  return getRefreshTokenLink({
    isUnauthenticatedError(graphQLError) {
      const code = graphQLError.extensions?.code
      return code && String(code) === '401'
    },
    getToken,
    fetchAction: refreshToken,
  })
}
