import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { message as antdMessage, Modal } from 'antd'
import { debounce } from 'lodash'
import config from '@/config'
import { permissionStore } from '@/stores/permissions'

const httpLink = new HttpLink({
  uri: `${config.baseUrl}graphql`,
})
// 请求处理
const requestMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = permissionStore.getState().token
    if (token) {
      Object.assign(headers, { Authorization: token })
    }
    return {
      headers,
    }
  })
  return forward(operation)
})
// 响应处理
const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    return response
  })
})
// 错误处理
let loginModalIsShown = false
const errorTip = debounce(antdMessage.error, 500)
const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: Message: ${message}`)
      const { code } = extensions
      // 权限验证错误
      if (code === 401) {
        if (!loginModalIsShown) {
          loginModalIsShown = true
          Modal.warning({
            title: '系统提示',
            content: '登录状态已失效，请重新登录',
            onOk() {
              loginModalIsShown = false
              permissionStore.getState().clear()
            },
            okText: '确定',
          })
        }
      } else {
        // 其他错误，直接提示
        errorTip(message)
      }
    })
  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError.stack}`)
  }
})
export default new ApolloClient({
  link: concat(
    errorMiddleware,
    concat(responseMiddleware, concat(requestMiddleware, httpLink)),
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    // 禁用缓存
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
})
