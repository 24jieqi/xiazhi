import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card, Popover } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppItem } from '@/graphql/generated/types'
import {
  APP_DETAIL,
  EDIT_APP,
} from '@/router/config/main-routes/application/path'

const { Meta } = Card

interface AppCardProps {
  data: AppItem
}

const coverPlaceholder =
  'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'

function getCoverUrl(pictures: string[]) {
  if (!pictures || !pictures.length) {
    return coverPlaceholder
  }
  return pictures[0] || coverPlaceholder
}

const AppCard: React.FC<AppCardProps> = ({ data }) => {
  const navigate = useNavigate()
  function handleRedirectAppSetting() {
    navigate(`${APP_DETAIL}/${data.app_id}`)
  }
  function handleRedirectAppEdit() {
    navigate(`${EDIT_APP}/${data.app_id}`)
  }
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="cover" src={getCoverUrl(data.pictures)} />}
      actions={[
        <SettingOutlined key="setting" onClick={handleRedirectAppSetting} />,
        <EditOutlined key="edit" onClick={handleRedirectAppEdit} />,
        // <EllipsisOutlined key="ellipsis" />,
      ]}>
      <Meta
        avatar={
          <Popover
            title="创建者信息"
            content={
              <div>
                <p>{data.creator.name}</p>
                <p>{data.creator.email}</p>
              </div>
            }>
            <Avatar
              src={data.creator.avatar || 'https://joeschmoe.io/api/v1/random'}
            />
          </Popover>
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  )
}

export default AppCard
