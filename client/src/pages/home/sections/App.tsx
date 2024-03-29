import React from 'react'
import { Empty, Space, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCurrentAppsQuery } from '@/graphql/operations/__generated__/app.generated'
import { NEW_APP } from '@/router/config/main-routes/application/path'
import AppCard from '@/pages/application/components/app-card'

const AppHomeEntry: React.FC = () => {
  const { data, loading } = useGetCurrentAppsQuery()

  const appList = data?.getCurrentApps?.records || []

  return (
    <Spin spinning={loading}>
      {appList && appList.length > 0 ? (
        // tips: 添加负margin为了解决咱不可知的样式异常
        <div style={{ marginTop: '-16px' }}>
          <Space wrap size={12}>
            {appList.map(app => (
              <AppCard key={app.app_id} data={app} />
            ))}
          </Space>
        </div>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          description={
            <span>
              暂无可用应用，你可以被邀请加入一个应用或是
              <Link to={NEW_APP}>创建</Link>
              一个应用
            </span>
          }
          imageStyle={{
            height: 60,
          }}
        />
      )}
    </Spin>
  )
}

export default AppHomeEntry
