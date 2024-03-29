/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  ActionType,
  ColumnsState,
  ParamsType,
  ProColumns,
} from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import { EntryItem } from '@/graphql/generated/types'
import { usePageAllPublicEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import EntryModal from '@/pages/entry/components/entry-modal'
import ModifyRecordsModal from '@/pages/entry/components/modify-record-modal'
import {
  langColumnsState,
  langKeys,
  langTableColumns,
} from '@/pages/application/constant'

const Entry: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [pageAllPublicEntries] = usePageAllPublicEntriesLazyQuery()
  const [columnsStateMap, setColumnsStateMap] =
    useState<Record<string, ColumnsState>>(langColumnsState)
  async function handleRequest(
    params: ParamsType & {
      pageSize?: number
      current?: number
      startTime?: number
      endTime?: number
      key?: string
      mainLangText?: string
    } = {},
  ) {
    const res = await pageAllPublicEntries({
      variables: {
        pageNo: params.current,
        pageSize: params.pageSize,
        startTime: params.startTime,
        endTime: params.endTime,
        key: params.key,
        mainLangText: params.mainLangText,
      },
    })
    const data = res?.data?.pageAllPublicEntries
    return {
      data: data.records,
      success: true,
      total: data.total,
    }
  }

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
      tip: '更多语言查看请点击右侧列设置',
      children: langTableColumns,
      hideInSearch: true,
    },
    {
      title: '主语言',
      dataIndex: 'mainLangText',
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: dayjs(value[0]).valueOf(),
            endTime: dayjs(value[1]).valueOf(),
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
            onRollbackSuccess={actionRef.current?.reload}
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
      render: (text, record, _, action) => {
        const langArray = Object.keys(record.langs)
        const supportLanguageArray = [].concat(langArray)

        langKeys.forEach(lang => {
          if (!supportLanguageArray.includes(lang)) {
            supportLanguageArray.push(lang)
          }
        })

        return [
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
        ]
      },
    },
  ]
  return (
    <ProTable<EntryItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      bordered
      scroll={{ x: 960 }}
      request={handleRequest}
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
        onSave: async (rowKey, data, row) => {},
        onChange: setEditableRowKeys,
      }}
      columnsState={{
        value: columnsStateMap,
        onChange: map => {
          setColumnsStateMap(map)
        },
      }}
    />
  )
}

export default Entry
