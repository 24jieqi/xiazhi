import { PageContainer, ProCard } from '@ant-design/pro-components'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import AppBasicInfo from './sections/basic-info'
import AccessKeyManagement from './sections/access-key'

export default () => {
  const params = useParams()
  const [tabActiveKey, setTabActiveKey] = useState('1')
  const { data, loading } = useGetAppInfoByIdQuery({
    variables: {
      getAppInfoByIdId: Number(params.id),
    },
  })
  const appInfo = data?.getAppInfoById || {}
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}>
      <PageContainer
        fixedHeader
        header={{
          title: appInfo.name,
        }}
        loading={loading}
        tabActiveKey={tabActiveKey}
        onTabChange={setTabActiveKey}
        tabList={[
          {
            tab: '基础信息',
            key: '1',
          },
          {
            tab: '应用设置',
            key: '2',
          },
          {
            tab: '协作者',
            key: '3',
            disabled: true,
          },
        ]}>
        <ProCard>
          {tabActiveKey === '1' ? (
            <AppBasicInfo app={appInfo} />
          ) : (
            <AccessKeyManagement />
          )}
        </ProCard>
      </PageContainer>
    </div>
  )
}
