/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Spin } from 'antd'
import useRedirect from '@/hooks/auth/useRedirect'

const RedirectPage: React.FC = () => {
  useRedirect()
  return <Spin>加载中...</Spin>
}
export default RedirectPage
