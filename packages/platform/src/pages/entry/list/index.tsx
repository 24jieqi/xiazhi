import type {
  ActionType,
  ParamsType,
  ProColumns,
} from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { ActionText } from '@fruits-chain/react-bailu'
import { App } from 'antd'
import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { Entry } from '@/graphql/generated/types'
import { useGetAppByIdQuery } from '@/graphql/operations/app/__generated__/index.generated'
import {
  useDeleteEntryMutation,
  usePageAppEntriesLazyQuery,
} from '@/graphql/operations/entry/__generated__/index.generated'

import EntryModal from './components/create-modal'

const EntryListPage: React.FC = () => {
  const [params] = useSearchParams()
  const appId = Number(params.get('id'))
  const { message } = App.useApp()
  const actions = useRef<ActionType>()
  const [pageAllPublicEntries] = usePageAppEntriesLazyQuery()
  const [deleteEntry] = useDeleteEntryMutation()
  const { data: appInfo } = useGetAppByIdQuery({ variables: { appId } })
  async function handleDeleteEntry(id: number) {
    await deleteEntry({
      variables: {
        deleteEntryId: id,
      },
    })
    message.success('删除词条成功！')
    actions.current.reload()
  }
  const columns: ProColumns<Entry>[] = [
    {
      title: '词条Key',
      dataIndex: 'key',
      copyable: true,
      width: 120,
    },
    {
      title: '主语言',
      dataIndex: 'mainLangText',
      ellipsis: true,
      width: 120,
    },
    {
      title: '多语言',
      dataIndex: 'langs',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      render(_, entity) {
        return JSON.stringify(entity.langs)
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 120,
      hideInSearch: true,
      render(_, entity) {
        return (
          <ActionText.Group>
            <EntryModal
              app={appInfo?.getAppById}
              entry={entity}
              onActionSuccess={actions.current.reload}>
              <ActionText>编辑</ActionText>
            </EntryModal>
            <ActionText
              status="danger"
              action={() => handleDeleteEntry(entity.id)}>
              删除
            </ActionText>
          </ActionText.Group>
        )
      },
    },
  ]
  async function handleRequest(
    _params: ParamsType & {
      pageSize?: number
      current?: number
      keyword?: string
    } = {},
  ) {
    const res = await pageAllPublicEntries({
      variables: {
        pageNo: _params.current,
        pageSize: _params.pageSize,
        appId,
        key: _params.key,
        mainLangText: _params.mainLangText,
      },
    })
    const data = res?.data?.pageAppEntries
    return {
      data: data.records,
      success: true,
      total: data.total,
    }
  }
  return (
    <div
      style={{
        background: '#F5F7FA',
        height: '100%',
      }}>
      <PageContainer
        title="词条管理"
        subTitle={`应用:${appInfo?.getAppById.name}`}
        extra={
          <EntryModal
            app={appInfo?.getAppById}
            onActionSuccess={() => actions.current.reload()}
          />
        }>
        <ProTable<Entry>
          columns={columns}
          request={handleRequest}
          rowKey="entry_id"
          search={{
            labelWidth: 'auto',
          }}
          actionRef={actions}
          pagination={{
            pageSize: 10,
          }}
        />
      </PageContainer>
    </div>
  )
}

export default EntryListPage
