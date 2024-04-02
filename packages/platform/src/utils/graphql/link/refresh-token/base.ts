import { Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import type { GraphQLError } from 'graphql'

type FetchAction = (refreshToken: string) => Promise<string | undefined>

type IsUnauthenticatedError = (graphQLError: GraphQLError) => boolean

export type Token = string | undefined | null

export type GetToken = () => {
  refreshToken: Token
  accessToken: Token
}

type TokenValidFn = (refreshToken: Token, accessToken: Token) => boolean

type OnSuccessfulRefetch = (refreshToken?: string) => void

type OnFailedRefresh = (error: any) => void

interface Options {
  /**
   * 判断异常是否需要刷新
   */
  isUnauthenticatedError: IsUnauthenticatedError
  /**
   * 获取新token
   */
  fetchAction: FetchAction
  /**
   * 获取token函数
   */
  getToken: GetToken
  /**
   * token是否可用默认为`() => true`
   * @returns
   */
  isTokenValid?: TokenValidFn
  /**
   * token携带字段key，默认为`Authorization`
   */
  authorizationHeaderKey?: string
  /**
   * 刷新成功时候的回调
   */
  onSuccessfulRefresh?: OnSuccessfulRefetch
  /**
   * 刷新失败后的回调
   */
  onFailedRefresh?: OnFailedRefresh
}

/**
 * 通用的双token刷新token的实现
 * @param param0
 * @returns
 */
export const getRefreshTokenLink = ({
  isUnauthenticatedError,
  isTokenValid = () => true,
  fetchAction,
  authorizationHeaderKey = 'Authorization',
  onSuccessfulRefresh,
  onFailedRefresh,
  getToken,
}: Options) =>
  onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const graphQLError of graphQLErrors) {
        if (isUnauthenticatedError(graphQLError)) {
          const { refreshToken, accessToken } = getToken()
          if (!isTokenValid(refreshToken, accessToken)) {
            return forward(operation)
          }
          return new Observable(observer => {
            fetchAction(refreshToken)
              .then(newAccessToken => {
                if (!newAccessToken) {
                  throw new Error('Unable to fetch new access token')
                }
                operation.setContext(({ headers = {} }: any) => ({
                  headers: {
                    ...headers,
                    [authorizationHeaderKey]: newAccessToken || undefined,
                  },
                }))

                onSuccessfulRefresh?.()
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                }
                forward(operation).subscribe(subscriber)
              })
              .catch(error => {
                onFailedRefresh?.(error)
                observer.error(error)
              })
          })
        }
      }
    }

    return forward(operation)
  })
