/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Menu } from 'antd'
import React, { useRef } from 'react'
import { EntryItem } from '@/graphql/generated/types'
import { usePageAllPublicEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'

const columns: ProColumns<EntryItem>[] = [
  {
    title: '词条key',
    dataIndex: 'key',
    copyable: true,
    formItemProps: {
      rules: [
        {
          required: false,
        },
      ],
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
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
  },
  {
    title: '修改记录',
    key: 'records',
    dataIndex: 'modifyRecords',
    render(_, record) {
      const modifyRecords = record.modifyRecords
      if (modifyRecords?.length) {
        return (
          <div>
            {modifyRecords.map((item, index) => (
              <p key={index}>{item.prevLangs}</p>
            ))}
          </div>
        )
      }
      return <p>暂未修改</p>
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [<a key="123">123</a>],
  },
]

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
)

export default () => {
  const [pageAllPublicEntries] = usePageAllPublicEntriesLazyQuery()
  const actionRef = useRef<ActionType>()
  return (
    <ProTable<EntryItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        const res = await pageAllPublicEntries({
          variables: {
            pageNo: params.current,
            pageSize: params.pageSize,
          },
        })
        return res?.data?.pageAllPublicEntries || []
      }}
      editable={{
        type: 'multiple',
      }}
      // columnsState={{
      //   persistenceKey: 'pro-table-singe-demos',
      //   persistenceType: 'localStorage',
      //   onChange(value) {
      //     console.log('value: ', value)
      //   },
      // }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            }
          }
          return values
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="公共词条库"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  )
}
