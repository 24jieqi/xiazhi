import { LikeFilled, LikeOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { Button, Space, Statistic } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NEW_APP } from '@/router/config/main-routes/application/path'
import {
  useFeedbackMutation,
  useFeedbackStatisticsQuery,
} from '@/graphql/operations/__generated__/feedback.generated'
import AppHomeEntry from './sections/App'
import EntryHomeSearch from './sections/Entry'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('app')
  const { data, refetch } = useFeedbackStatisticsQuery()
  const [feedback] = useFeedbackMutation()
  const [like, setLike] = useState(false)
  const LikeIcon = like ? LikeFilled : LikeOutlined
  async function handleChangeLike() {
    setLike(true)
    await feedback({
      variables: {
        result: true,
      },
    })
    await refetch()
  }
  function handleRedirectCreateApp() {
    navigate(NEW_APP)
  }
  return (
    <PageContainer
      content="欢迎使用多语言词库平台"
      header={{
        title: '欢迎',
      }}
      tabActiveKey={current}
      tabList={[
        {
          tab: '应用',
          key: 'app',
        },
        {
          tab: '词条',
          key: 'entry',
        },
      ]}
      tabBarExtraContent={
        current === 'app' ? (
          <Button
            icon={<PlusOutlined />}
            size="small"
            type="primary"
            onClick={handleRedirectCreateApp}>
            创建应用
          </Button>
        ) : null
      }
      extraContent={
        <Space size={24}>
          <Statistic
            title="点赞"
            value={data?.countPositive}
            prefix={
              <Space>
                <LikeIcon onClick={handleChangeLike} />
              </Space>
            }
          />
        </Space>
      }
      onTabChange={setCurrent}>
      {current === 'app' ? <AppHomeEntry /> : <EntryHomeSearch />}
    </PageContainer>
  )
}

export default Home
