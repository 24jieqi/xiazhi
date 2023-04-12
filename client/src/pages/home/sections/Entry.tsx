/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { EditOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import type {
  ActionType,
  ParamsType,
  ProColumns,
} from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useRef, useState } from 'react'
import { EntryItem } from '@/graphql/generated/types'
import { usePageAllPublicEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import EntryModal from '@/pages/entry/components/entry-modal'
import ModifyRecordsModal from '@/pages/entry/components/modify-record-modal'
import TransformEntryModal, {
  TransformEntryModalRefProps,
} from '@/pages/entry/components/transform-entry-modal'
import { LanguageTypeEnum, langKeys } from '@/pages/application/constant'

const Entry: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const transformEntryRef = useRef<TransformEntryModalRefProps>(null)
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])

  const [pageAllPublicEntries] = usePageAllPublicEntriesLazyQuery()

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
      },
    })
    const data = res?.data?.pageAllPublicEntries
    return {
      data: data.records,
      success: true,
      total: data.total,
    }
  }

  function openTransformModal(record: EntryItem) {
    transformEntryRef.current?.open({
      entryId: record.entry_id,
      langObj: record.langs,
      key: record.key,
    })
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
      children: [
        {
          title: '中文',
          dataIndex: ['langs', LanguageTypeEnum.zh],
          readonly: true,
        },
        {
          title: '英文',
          dataIndex: ['langs', LanguageTypeEnum.en],
        },
        {
          title: '泰语',
          dataIndex: ['langs', LanguageTypeEnum.th],
        },
        {
          title: '越南语',
          dataIndex: ['langs', LanguageTypeEnum.vie],
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
            supportLanguageArray={supportLanguageArray}
            onActionSuccess={actionRef.current?.reload}>
            <Button key="button" type="link">
              <EditOutlined />
              编辑
            </Button>
          </EntryModal>,
          <Button
            type="link"
            key="transform"
            icon={<SwapOutlined />}
            onClick={() => {
              openTransformModal(record)
            }}>
            转换
          </Button>,
        ]
      },
    },
  ]

  return (
    <>
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
          <EntryModal
            key="new"
            onActionSuccess={actionRef.current?.reload}
            supportLanguageArray={langKeys}>
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
      />
      <TransformEntryModal
        ref={transformEntryRef}
        onActionSuccess={() => actionRef.current.reload()}
      />
    </>
  )
}

export default Entry
