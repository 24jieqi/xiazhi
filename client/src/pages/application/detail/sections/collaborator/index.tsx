import React from 'react'
import { Avatar, Button, Empty, message, Popover, Space, Statistic } from 'antd'
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

const { Divider } = ProCard

interface CollaboratorManagementProps extends AppSection {}

const CollaboratorManagement: React.FC<CollaboratorManagementProps> = ({
  app,
}) => {
  const { data, refetch } = useGetAppCollaboratorsQuery({
    variables: {
      appId: app.app_id,
    },
  })
  const { data: statisticsData } = useGetAppCollaboratorsStatisticsQuery({
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
  }
  if (!data?.getAppCollaborators || !data?.getAppCollaborators.length) {
    return (
      <Empty description="还未添加协作者">
        <AddCollaboratorsModal
          trigger={<Button type="primary">现在添加</Button>}
          appId={app?.app_id}
          onInviteSuccess={() => {
            refetch()
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
            item => item.userId === collaborator?.collaborator?.user_id,
          )
          return (
            <ProCard.Group
              className={styles.card}
              extra={
                <Button
                  loading={removeLoading}
                  type="link"
                  size="small"
                  onClick={() =>
                    handleRemoveCollaborator(collaborator.collaborator.user_id)
                  }>
                  移除
                </Button>
              }
              bordered
              direction="row"
              hoverable
              title={
                <div>
                  <Popover
                    title="协作者信息"
                    content={
                      <div>
                        <p>邮件：{collaborator?.collaborator.email}</p>
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
                      className={styles.avatar}
                      style={{ marginRight: 8 }}
                      src={
                        collaborator.collaborator.avatar ||
                        'https://joeschmoe.io/api/v1/random'
                      }
                    />
                    <span>{collaborator.collaborator.name}</span>
                  </Popover>
                </div>
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
              <ProCard wrap gutter={[12, 12]}>
                <Statistic
                  title="修改词条"
                  value={statistics?.modifyCount}
                  suffix="次"
                />
              </ProCard>
              {/* <Divider type="vertical" /> */}
              {/* <ProCard>
                <Statistic title="贡献度排名" value={1} />
              </ProCard> */}
            </ProCard.Group>
          )
        })}
      </Space>
    </ProCard>
  )
}

export default CollaboratorManagement
