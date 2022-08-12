import { Avatar, Card } from 'antd'
import React from 'react'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import useUser from '@/stores/user'
import usePermissions from '@/stores/permissions'

const { Meta } = Card

const UserCard: React.FC = () => {
  const { info } = useUser()
  const { clear } = usePermissions()
  function handleLogout() {
    clear()
  }
  return (
    <Card
      bordered={false}
      actions={[
        <EditOutlined key="edit" />,
        <LogoutOutlined key="logout" onClick={handleLogout} />,
      ]}>
      <Meta
        avatar={<Avatar src={info.avatar} />}
        title={info.name}
        description={info.email}
      />
    </Card>
  )
}

export default UserCard
