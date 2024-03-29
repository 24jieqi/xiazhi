import {
  ParamsType,
  ProCard,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components'
import React from 'react'
import { Space, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import { EntryItem } from '@/graphql/generated/types'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import { appTypeOptions } from '@/pages/application/constant'
import { usePageAppEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import ModifyRecordsModal from '../components/modify-record-modal'

const columns: ProColumns<EntryItem>[] = [
  {
    title: '词条Key',
    dataIndex: 'key',
    copyable: true,
    width: 200,
    render(dom, entity) {
      return (
        <Space>
          <div style={{ width: 200 }}> {dom}</div>
          {entity.archive ? <Tag color="#f50">已归档</Tag> : null}
        </Space>
      )
    },
  },
  {
    title: '主语言',
    dataIndex: 'mainLangText',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    width: 200,
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '最近修改',
    key: 'updateTime',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
    width: 200,
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '词条修改记录',
    key: 'updateTime',
    width: 120,
    dataIndex: 'modifyRecords',
    hideInSearch: true,
    render(_, record) {
      const { entry_id, langs, key, modifyRecords, appId } = record
      return (
        <ModifyRecordsModal
          onRollbackSuccess={() => {}}
          records={{ entry_id, appId, langs, key }}
          modifyRecords={modifyRecords || []}
        />
      )
    },
  },
]

const EntryReadOnlyListPage: React.FC = () => {
  const params = useParams()
  const { data } = useGetAppInfoByIdQuery({
    variables: {
      id: Number(params.id),
    },
  })
  const appId = Number(params.id)
  const [pageAllPublicEntries] = usePageAppEntriesLazyQuery()
  async function handleRequest(
    params: ParamsType & {
      pageSize?: number
      current?: number
      keyword?: string
    } = {},
  ) {
    const res = await pageAllPublicEntries({
      variables: {
        pageNo: params.current,
        pageSize: params.pageSize,
        appId,
        key: params.key,
        mainLangText: params.mainLangText,
      },
    })
    const data = res?.data?.pageAppEntries
    return {
      data: data.records,
      success: true,
      total: data.total,
    }
  }
  const currentType = appTypeOptions.find(
    item => item.value === data?.getAppInfoById?.type,
  )
  return (
    <ProCard
      split="vertical"
      title={data?.getAppInfoById?.name}
      subTitle={[
        <Tag key="label" color="#2db7f5">
          {currentType?.label}
        </Tag>,
      ]}>
      <ProTable<EntryItem>
        columns={columns}
        request={handleRequest}
        rowKey="entry_id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
      />
    </ProCard>
  )
}

export default EntryReadOnlyListPage
