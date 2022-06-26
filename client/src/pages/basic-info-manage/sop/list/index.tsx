import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { HOME } from '@/router/config/main-routes/home/path'
import usePermissions from '@/stores/permissions'

const SopList: React.FC = () => {
  const navigate = useNavigate()
  const { clear } = usePermissions()
  function handleBackToHome() {
    clear()
    // navigate(HOME)
    // setToken('')
  }
  return (
    <div>
      <p>sop列表</p>
      <Button onClick={handleBackToHome}>退出登录</Button>
    </div>
  )
}

export default SopList
