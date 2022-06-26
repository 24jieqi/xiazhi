import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { useNavigate } from 'react-router'
import usePermissions from '@/stores/permissions'
import { LOGIN_PATH } from '@/router/config/basePath'

/**
 * 若系统需要鉴权，这执行鉴权逻辑（组件需要鉴权时使用）
 * @param Component 需要鉴权的组件
 */
function auth<T extends object>(Component: React.FC<T>): React.FC<T> {
  return props => {
    const navigate = useNavigate()
    const { token } = usePermissions()
    useEffect(() => {
      if (!token) {
        Modal.info({
          title: '系统提示',
          content: '您尚未登录',
          okText: '知道了',
          onOk() {
            navigate(LOGIN_PATH)
          },
        })
      }
    }, [navigate, token])
    return <Component {...props} />
  }
}

export default auth
