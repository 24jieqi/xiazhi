import { EditTwoTone, EyeTwoTone, SettingTwoTone } from '@ant-design/icons'
import { Avatar, Card, Col, Popover, Row, Statistic, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppItem, CollaboratorRoleEnum } from '@/graphql/generated/types'
import {
  APP_DETAIL,
  EDIT_APP,
} from '@/router/config/main-routes/application/path'

import { useGetAppCollaboratorsQuery } from '@/graphql/operations/__generated__/app.generated'
import { collaboratorRoleMap } from '../../detail/sections/collaborator'
import styles from './index.module.less'
import { ENTRY_LIST } from '@/router/config/main-routes/entry/path'

const { Meta } = Card

interface AppCardProps {
  data: AppItem
}

enum ActionType {
  READ,
  EDIT,
  SETTING,
}

/**
 * 不同协作者角色对应操作图标
 */
const roleIconMap: {
  [key in CollaboratorRoleEnum]: {
    Icon: React.ComponentType<any>
    type: ActionType
  }[]
} = {
  [CollaboratorRoleEnum.Guest]: [{ Icon: EyeTwoTone, type: ActionType.READ }],
  [CollaboratorRoleEnum.Manager]: [
    { Icon: SettingTwoTone, type: ActionType.SETTING },
    { Icon: EditTwoTone, type: ActionType.EDIT },
    { Icon: EyeTwoTone, type: ActionType.READ },
  ],
  [CollaboratorRoleEnum.Owner]: [
    { Icon: SettingTwoTone, type: ActionType.SETTING },
    { Icon: EditTwoTone, type: ActionType.EDIT },
    { Icon: EyeTwoTone, type: ActionType.READ },
  ],
  [CollaboratorRoleEnum.Translator]: [
    { Icon: EditTwoTone, type: ActionType.EDIT },
    { Icon: EyeTwoTone, type: ActionType.READ },
  ],
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
  // 获取协作者列表
  const { data: collaboratorList } = useGetAppCollaboratorsQuery({
    variables: {
      appId: data.app_id,
    },
  })
  function handleActionClick(type: ActionType) {
    switch (type) {
      case ActionType.READ:
        navigate(`${ENTRY_LIST}/${data.app_id}`)
        break
      case ActionType.EDIT:
        navigate(`${EDIT_APP}/${data.app_id}`)
        break
      case ActionType.SETTING:
        navigate(`${APP_DETAIL}/${data.app_id}`)
        break
      default:
        break
    }
  }
  const actions = roleIconMap[data.role].map(Item => (
    <Item.Icon key={Item.type} onClick={() => handleActionClick(Item.type)} />
  ))
  const roleConfig = collaboratorRoleMap[data.role]
  return (
    <Card
      title={
        <div className={styles.titleWrap}>
          <p>{data.name}</p>
          <Tag color={roleConfig.color}>{roleConfig.label}</Tag>
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
      actions={actions}>
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
