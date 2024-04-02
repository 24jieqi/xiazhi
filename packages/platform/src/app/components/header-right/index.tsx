import { Space } from 'antd'
import React from 'react'

import UserInfo from './components/user-info'

const HeaderRight: React.FC = () => {
  return (
    <Space size={24}>
      <UserInfo />
    </Space>
  )
}

export default HeaderRight
