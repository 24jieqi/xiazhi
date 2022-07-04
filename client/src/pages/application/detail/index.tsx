import { PageContainer, ProCard } from '@ant-design/pro-components'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import AppBasicInfo from './sections/basic-info'

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
            tab: '访问key',
            key: '2',
          },
          {
            tab: '设置',
            key: '3',
            disabled: true,
          },
          {
            tab: '协作者',
            key: '4',
            disabled: true,
          },
        ]}>
        <ProCard>
          {tabActiveKey === '1' ? <AppBasicInfo app={appInfo} /> : null}
        </ProCard>
      </PageContainer>
    </div>
  )
}
