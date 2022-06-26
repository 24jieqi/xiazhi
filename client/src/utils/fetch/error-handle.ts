import { message } from 'antd'
let msgTime = 0
const msgs = {
  forbiddenMsg: '拒绝访问',
  tokenInvalidMsg: '登录已过期，请重新登录',
  timeoutMsg: '请求超时，请稍后再试',
  errorMsg: '报告！服务器出了点小问题，稍后再试试...',
  networkErrorMsg: '您的网络出现问题，请检查网络重试',
}
// 错误提示
function handleNoCommonError(err, config = null) {
  // 请求配置了不提示时不提示
  if (config?.noErrorTip) {
    return false
  }
  // 弹框节流
  const now = Date.now()
  if (now - msgTime < 3000) {
    return false
  }
  msgTime = now
  // 提示
  if (err) {
    message.destroy()
    if (typeof err === 'string') {
      message.error(err)
    } else {
      message.error(JSON.stringify(err))
    }
  }
}
export { handleNoCommonError, msgs }
