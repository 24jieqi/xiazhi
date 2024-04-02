import { type DefaultContext } from '@apollo/client'
import type { NetworkError } from '@apollo/client/errors'
import { onError } from '@apollo/client/link/error'

export interface ExtensionType {
  message: string
  errorType: string
  code: number
}

export type ErrorLinkContext = DefaultContext & {
  /**
   * 针对每个接口 可以设置是否跳过处理graphql异常 转由业务方自行处理
   */
  skipHandleError?: boolean
}

export type ErrorLinkConfig = {
  onGraphqlError: (
    code: string,
    errorMsg: string,
    context?: ErrorLinkContext,
  ) => void
  onNetworkError?: (networkError: NetworkError) => void
}

export default function makeErrorLink(config: ErrorLinkConfig) {
  return onError(({ graphQLErrors, networkError, operation }) => {
    const { skipHandleError } = operation.getContext() as ErrorLinkContext
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, extensions, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        )
        // 只有存在自定义扩展并且不跳过通用的异常处理 才执行自定义`onGraphqlError`
        if (extensions && !skipHandleError) {
          const { code, message: errorMessage } =
            extensions as unknown as ExtensionType
          config.onGraphqlError(
            String(code),
            errorMessage || message,
            operation.getContext() as ErrorLinkContext,
          )
        }
      })
    }
    if (networkError) {
      if (config.onNetworkError) {
        config.onNetworkError!(networkError)
      } else {
        console.error(`[Network error]: ${networkError.stack}`)
      }
    }
  })
}
