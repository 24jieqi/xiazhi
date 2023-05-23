import React from 'react'
import {
  Avatar,
  Button,
  Col,
  Empty,
  message,
  Popover,
  Row,
  Space,
  Statistic,
  Tag,
} from 'antd'
import { ProCard } from '@ant-design/pro-components'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import {
  useGetAppCollaboratorsQuery,
  useGetAppCollaboratorsStatisticsQuery,
  useRemoveCollaboratorsMutation,
} from '@/graphql/operations/__generated__/app.generated'
import { AppSection } from '../interface'
import styles from './style.module.less'
import AddCollaboratorsModal from './components/add-modal'
import { CollaboratorRoleEnum } from '@/graphql/generated/types'

const { Divider } = ProCard

interface CollaboratorManagementProps extends AppSection {}

const collaboratorRoleMap: {
  [key in CollaboratorRoleEnum]: {
    label: string
    color: string
  }
} = {
  [CollaboratorRoleEnum.Guest]: {
    label: '访客',
    color: '#f50',
  },
  [CollaboratorRoleEnum.Manager]: {
    label: '管理员',
    color: '#2db7f5',
  },
  [CollaboratorRoleEnum.Translator]: {
    label: '成员',
    color: '#0065fe',
  },
}

const CollaboratorManagement: React.FC<CollaboratorManagementProps> = ({
  app,
}) => {
  const { data, refetch } = useGetAppCollaboratorsQuery({
    variables: {
      appId: app.app_id,
    },
  })
  const { data: statisticsData, refetch: refetchStatistics } =
    useGetAppCollaboratorsStatisticsQuery({
      variables: {
        appId: app.app_id,
      },
    })
  const [removeCollaborators, { loading: removeLoading }] =
    useRemoveCollaboratorsMutation()
  async function handleRemoveCollaborator(userId: number) {
    await removeCollaborators({
      variables: {
        appId: app.app_id,
        userIdList: [userId],
      },
    })
    message.success('移除协作者成功！')
    refetch()
    refetchStatistics()
  }
  if (!data?.getAppCollaborators || !data?.getAppCollaborators.length) {
    return (
      <Empty description="还未添加协作者">
        <AddCollaboratorsModal
          trigger={<Button type="primary">现在添加</Button>}
          appId={app?.app_id}
          onInviteSuccess={() => {
            refetch()
            refetchStatistics()
          }}
        />
      </Empty>
    )
  }
  return (
    <ProCard
      headStyle={{ padding: 0 }}
      bodyStyle={{ padding: 0, paddingTop: 12 }}
      extra={
        <AddCollaboratorsModal
          trigger={
            <Button icon={<PlusOutlined />} type="primary" size="small">
              添加
            </Button>
          }
          appId={app?.app_id}
          onInviteSuccess={() => {
            refetch()
          }}
        />
      }>
      <Space wrap>
        {data.getAppCollaborators.map((collaborator, index) => {
          const statistics = statisticsData?.getAppCollaboratorsStatistics.find(
            item => item.userId === collaborator.id,
          )
          const tagConfig = collaboratorRoleMap[collaborator.role]
          return (
            <ProCard.Group
              className={styles.card}
              extra={
                <Button
                  loading={removeLoading}
                  type="link"
                  size="small"
                  onClick={() =>
                    handleRemoveCollaborator(collaborator.user.user_id)
                  }>
                  移除
                </Button>
              }
              bordered
              direction="row"
              hoverable
              title={
                <Row align="middle" gutter={[8, 0]}>
                  <Col>
                    <Popover
                      title="协作者信息"
                      content={
                        <div>
                          <p>邮件：{collaborator?.user?.email}</p>
                          <p>
                            加入时间：
                            {dayjs(collaborator.assignedAt).format(
                              'YYYY-MM-DD HH:mm:ss',
                            )}
                          </p>
                        </div>
                      }>
                      <Avatar
                        size="small"
                        src={
                          collaborator.user.avatar ||
                          'https://joeschmoe.io/api/v1/random'
                        }
                      />
                    </Popover>
                  </Col>
                  <Col>
                    <span className={styles.userName}>
                      {collaborator.user.name}
                    </span>
                  </Col>
                  <Col>
                    <Tag color={tagConfig.color}>{tagConfig.label}</Tag>
                  </Col>
                </Row>
              }
              key={index}>
              <ProCard>
                <Statistic
                  title="总计新增"
                  value={statistics?.addCount}
                  suffix={`/ ${app.entryCount}`}
                />
              </ProCard>
              <Divider type="vertical" />
              <ProCard>
                <Statistic
                  title="今日新增"
                  value={statistics?.addCountToday}
                  suffix={`/ ${statistics?.addCount}`}
                />
              </ProCard>
              <Divider type="vertical" />
              <ProCard wrap>
                <Statistic
                  title="修改词条"
                  value={statistics?.modifyCount}
                  suffix="次"
                />
              </ProCard>
            </ProCard.Group>
          )
        })}
      </Space>
    </ProCard>
  )
}

export default CollaboratorManagement
