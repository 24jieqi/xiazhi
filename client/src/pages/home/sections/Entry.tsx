/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useRef, useState } from 'react'
import { EntryItem, LanguageTypeEnum } from '@/graphql/generated/types'
import { usePageAllPublicEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import EntryModal from '@/pages/entry/components/entry-modal'
import ModifyRecordsModal from '@/pages/entry/components/modify-record-modal'

export default () => {
  const [pageAllPublicEntries] = usePageAllPublicEntriesLazyQuery()
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const columns: ProColumns<EntryItem>[] = [
    {
      title: '词条Key',
      dataIndex: 'key',
      copyable: true,
      editable: (text, record, index) => {
        return index !== 0
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      readonly: true,
    },
    {
      title: '多语言',
      children: [
        {
          title: '中文',
          dataIndex: ['langs', LanguageTypeEnum.Chinese],
          readonly: true,
        },
        {
          title: '英文',
          dataIndex: ['langs', LanguageTypeEnum.English],
        },
        {
          title: '泰语',
          dataIndex: ['langs', LanguageTypeEnum.Thai],
        },
        {
          title: '越南语',
          dataIndex: ['langs', LanguageTypeEnum.Vietnamese],
        },
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          }
        },
      },
    },
    {
      title: '最近修改',
      key: 'updateTime',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      readonly: true,
    },
    {
      title: '修改记录',
      key: 'records',
      dataIndex: 'modifyRecords',
      hideInSearch: true,
      readonly: true,
      render(_, record) {
        const { entry_id, langs, key, modifyRecords } = record
        return (
          <ModifyRecordsModal
            onRollbackSucess={actionRef.current?.reload}
            records={{ entry_id, langs, key }}
            modifyRecords={modifyRecords || []}
          />
        )
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <EntryModal
          key="new"
          initialFormData={{
            entryId: record.entry_id,
            key: record.key,
            ...record.langs,
          }}
          onActionSuccess={actionRef.current?.reload}>
          <Button key="button" type="link">
            <EditOutlined />
            编辑
          </Button>
        </EntryModal>,
      ],
    },
  ]

  return (
    <ProTable<EntryItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      bordered
      scroll={{ x: 960 }}
      request={async (params = {}, sort, filter) => {
        const res = await pageAllPublicEntries({
          variables: {
            pageNo: params.current,
            pageSize: params.pageSize,
          },
        })
        const data = res?.data?.pageAllPublicEntries
        return {
          data: data.records,
          success: true,
          total: data.total,
        }
      }}
      rowKey="entry_id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="公共词条库"
      toolBarRender={() => [
        <EntryModal key="new" onActionSuccess={actionRef.current?.reload}>
          <Button key="button" type="primary">
            <PlusOutlined />
            新建
          </Button>
        </EntryModal>,
      ]}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row)
        },
        onChange: setEditableRowKeys,
      }}
    />
  )
}
