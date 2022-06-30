import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { Modal } from 'antd'
import usePermissions from '@/stores/permissions'
import { mainRoutes } from '@/router/config'
import config from '@/config'
import { LOGIN_PATH } from '@/router/config/basePath'

const useRedirect = () => {
  const navigate = useNavigate()
  const { permissions, token } = usePermissions()
  const redirect = useCallback(
    (auth = true) => {
      // 有权限
      let currentPath = sessionStorage.getItem('REDIRECT_URL')
      sessionStorage.removeItem('REDIRECT_URL')
      if (!currentPath) {
        currentPath = '/home'
      }
      navigate(currentPath)
    },
    [navigate],
  )
  useEffect(() => {
    // 未登录
    if (!token) {
      navigate(LOGIN_PATH)
      return
    }
    // 使用权限路由
    if (config.authorization) {
      // 权限尚未初始化
      if (permissions === null) {
        return
      }
      // 已登录但用户无权限
      if (permissions && !permissions.length) {
        Modal.info({
          title: '系统提示',
          content: '暂无访问权限',
          okText: '知道了',
          onOk() {
            navigate(LOGIN_PATH)
          },
        })
      } else {
        // 已登录且有权限
        redirect()
      }
    } else {
      // 用户已登录但不需要鉴权
      redirect(false)
    }
  }, [permissions, token, navigate, redirect])
}

export default useRedirect
