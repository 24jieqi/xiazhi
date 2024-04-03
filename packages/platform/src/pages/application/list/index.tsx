import type {
  ParamsType,
  ProColumns,
  ActionType,
} from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { ActionText } from '@fruits-chain/react-bailu'
import { formatDate } from '@fruits-chain/utils'
import { App as AntdApp } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import langMap from '@/config/lang-map'
import type { App } from '@/graphql/generated/types'
import {
  useGetAppsLazyQuery,
  useRefreshAccessKeyMutation,
} from '@/graphql/operations/app/__generated__/index.generated'
import { ENTRY_LIST } from '@/pages/entry/route'

import CreateAppModal from './components/create-modal'

const AppListPage: React.FC = () => {
  const [getApps] = useGetAppsLazyQuery()
  const [refreshAccessKey] = useRefreshAccessKeyMutation()
  const [refreshAKLoading, setRefreshAKLoading] = useState(false)
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()
  const actionRef = useRef<ActionType>()
  async function handleRequest(_params: ParamsType = {}) {
    const res = await getApps({
      variables: {},
    })
    const _data = res?.data?.getApps
    return {
      data: _data,
      success: true,
      total: _data.length,
    }
  }
  async function handleGenerateAccessKey(appId: number) {
    setRefreshAKLoading(true)
    try {
      await refreshAccessKey({
        variables: {
          appId,
        },
      })
      message.success('访问key生成成功！')
      actionRef.current.reload()
    } finally {
      setRefreshAKLoading(false)
    }
  }
  const columns: ProColumns<App>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 60,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '应用描述',
      dataIndex: 'description',
      hideInSearch: true,
      width: 120,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      width: 120,
      renderText(_, record) {
        return formatDate(new Date(record.createdAt), { mode: 'date-time' })
      },
    },
    {
      title: '多语言',
      dataIndex: 'languages',
      hideInSearch: true,
      width: 120,
      render(_, entity) {
        return entity.languages.map(lang => langMap[lang].zhName).join('、')
      },
    },
    {
      title: '访问Key',
      dataIndex: 'accessKey',
      hideInSearch: true,
      width: 120,
      copyable: true,
      ellipsis: true,
      render(dom, entity) {
        if (entity.accessKey) {
          return dom
        }
        return (
          <ActionText
            loading={refreshAKLoading}
            onClick={() => handleGenerateAccessKey(entity.appId)}>
            生成
          </ActionText>
        )
      },
    },
    {
      title: '词条数',
      dataIndex: 'entries',
      hideInSearch: true,
      width: 60,
      align: 'right',
      render(_, entity) {
        return entity?.entries?.length
      },
    },
    {
      title: '操作',
      width: 120,
      hideInSearch: true,
      render(_, entity) {
        return (
          <ActionText.Group>
            <ActionText
              onClick={() => navigate(`${ENTRY_LIST}?id=${entity.appId}`)}>
              词条管理
            </ActionText>
          </ActionText.Group>
        )
      },
    },
  ]
  return (
    <div
      style={{
        background: '#F5F7FA',
        height: '100%',
      }}>
      <PageContainer
        title="应用列表"
        extra={
          <CreateAppModal onCreateSuccess={() => actionRef.current.reload()} />
        }>
        <ProTable<App>
          columns={columns}
          actionRef={actionRef}
          request={handleRequest}
          pagination={false}
        />
      </PageContainer>
    </div>
  )
}

export default AppListPage
