import { EditTwoTone, SettingTwoTone } from '@ant-design/icons'
import { Avatar, Card, Col, Popover, Row, Statistic, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppItem } from '@/graphql/generated/types'
import {
  APP_DETAIL,
  EDIT_APP,
} from '@/router/config/main-routes/application/path'
import useUser from '@/stores/user'

import { useGetAppCollaboratorsQuery } from '@/graphql/operations/__generated__/app.generated'
import styles from './index.module.less'

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

  const { info } = useUser()
  // 获取协作者列表
  const { data: collaboratorList } = useGetAppCollaboratorsQuery({
    variables: {
      appId: data.app_id,
    },
  })

  function handleRedirectAppSetting() {
    navigate(`${APP_DETAIL}/${data.app_id}`)
  }

  function handleRedirectAppEdit() {
    navigate(`${EDIT_APP}/${data.app_id}`)
  }

  const isCollaborator = info.user_id !== data.creatorId

  return (
    <Card
      title={
        <div className={styles.titleWrap}>
          <p>{data.name}</p>
          {isCollaborator ? <Tag color="#2db7f5">协作</Tag> : null}
        </div>
      }
      style={{ width: 300 }}
      cover={
        <img
          alt="cover"
          src={getCoverUrl(data.pictures)}
          className={styles.coverImg}
        />
      }
      actions={[
        isCollaborator ? null : (
          <SettingTwoTone key="setting" onClick={handleRedirectAppSetting} />
        ),
        <EditTwoTone key="edit" onClick={handleRedirectAppEdit} />,
      ].filter(Boolean)}>
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
        description={<p className={styles.appDesc}>{data.description}</p>}
      />
      <Row className={styles.cardInfoWrap}>
        <Col span={12}>
          <Statistic title="词条数" value={data.entryCount} />
        </Col>
        <Col span={12}>
          <Statistic
            title="协作者"
            value={collaboratorList?.getAppCollaborators?.length}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default AppCard
