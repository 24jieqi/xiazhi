import type {
  ParamsType,
  ProColumns,
  ActionType,
} from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { useRef } from 'react'

import type { App } from '@/graphql/generated/types'
import { useGetAppsLazyQuery } from '@/graphql/operations/app/__generated__/index.generated'

import CreateAppModal from './components/create-modal'

const AppListPage: React.FC = () => {
  const [getApps] = useGetAppsLazyQuery()
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
    },
    {
      title: '多语言',
      dataIndex: 'languages',
      hideInSearch: true,
      width: 120,
    },
    {
      title: '访问Key',
      dataIndex: 'accessKey',
      hideInSearch: true,
      width: 120,
      copyable: true,
    },
    {
      title: '词条数',
      dataIndex: 'entries',
      hideInSearch: true,
      width: 60,
      render(_, entity) {
        return entity?.entries?.length
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
