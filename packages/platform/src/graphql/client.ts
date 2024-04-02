import debounce from 'lodash/debounce'

import { getAccess } from '@/chunfen'
import { message } from '@/constants/global'
import useUser from '@/stores/user'
import makeApolloClient from '@/utils/graphql/client'

let isTrigger = false

const messageKey = 'permission_change_message'

const errorTip = debounce(message.error, 500, {
  leading: true,
  trailing: false,
})

/**
 * 处理权限变更
 */
const permissionChangeHandler = async () => {
  if (!isTrigger) {
    isTrigger = true
    message.open({
      type: 'loading',
      content: '检测到权限变更，更新中...',
      duration: 0,
      key: messageKey,
    })
    const access = getAccess()
    await access.updateAccess(true)
    message.destroy(messageKey)
    isTrigger = false
  }
}
/**
 * graphql异常处理
 * @param code
 * @param msg
 * @param context
 */
function handleGraphqlError(
  code: string,
  msg: string,
  // context: DefaultContext,
) {
  switch (code) {
    case '401':
      // noAuthHandlers(context.token)
      break
    case '602':
      permissionChangeHandler()
      break
    default:
      errorTip(msg)
  }
}

const client = makeApolloClient({
  onGraphqlError: handleGraphqlError,
  getToken: () => ({
    accessToken: useUser.getState().token,
    refreshToken: useUser.getState().token,
  }),
  setToken: (newToken: string) => useUser.getState().setToken(newToken),
})

export default client
