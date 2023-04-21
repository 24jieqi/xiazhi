import { PageContainer, ProCard } from '@ant-design/pro-components'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import useCollaboratorPermissions from '@/pages/auth/useCollaboratorPermission'
import AppBasicInfo from './sections/basic-info'
import AccessKeyManagement from './sections/access-key'
import CollaboratorManagement from './sections/collaborator'

enum SectionKeyEnum {
  BASIC = 'BASIC',
  SETTING = 'SETTING',
  COLLABORATOR = 'COLLABORATOR',
}

const SectionCompMap = {
  [SectionKeyEnum.BASIC]: AppBasicInfo,
  [SectionKeyEnum.SETTING]: AccessKeyManagement,
  [SectionKeyEnum.COLLABORATOR]: CollaboratorManagement,
}

const tabListOptions = [
  {
    tab: '基础信息',
    key: SectionKeyEnum.BASIC,
  },
  {
    tab: '应用设置',
    key: SectionKeyEnum.SETTING,
  },
  {
    tab: '协作者',
    key: SectionKeyEnum.COLLABORATOR,
  },
]

const ApplicationDetail: React.FC = () => {
  const params = useParams()
  const [tabActiveKey, setTabActiveKey] = useState<SectionKeyEnum>(
    SectionKeyEnum.BASIC,
  )
  const { data, loading } = useGetAppInfoByIdQuery({
    variables: {
      getAppInfoByIdId: Number(params.id),
    },
  })

  const appInfo = data?.getAppInfoById || {}
  const ActiveComp = SectionCompMap[tabActiveKey]

  useCollaboratorPermissions({
    creatorId: appInfo?.creatorId,
    showAlert: true,
  })

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
        onTabChange={key => setTabActiveKey(key as SectionKeyEnum)}
        tabList={tabListOptions}>
        <ProCard>
          <ActiveComp app={appInfo} />
        </ProCard>
      </PageContainer>
    </div>
  )
}

export default ApplicationDetail
