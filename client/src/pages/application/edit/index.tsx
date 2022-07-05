import type { ProColumns } from '@ant-design/pro-components'
import { ProCard, ProTable } from '@ant-design/pro-components'
import { BadgeProps, Tag, Button, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import { usePageAppEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import { EntryItem } from '@/graphql/generated/types'
import { appTypeOptions } from '../constant'
// @ts-ignore
import styles from './split.less'
import EntryModal from '@/pages/entry/components/entry-modal'
import EntryForm from '@/pages/entry/components/entry-form'

type TableListItem = {
  createdAtRange?: number[]
  createdAt: number
  code: string
}

type DetailListProps = {
  ip: string
}

type statusType = BadgeProps['status']

const valueEnum: statusType[] = ['success', 'error', 'processing', 'default']

export type IpListItem = {
  ip?: string
  cpu?: number | string
  mem?: number | string
  disk?: number | string
  status: statusType
}

const ipListDataSource: IpListItem[] = []

for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: `106.14.98.1${i}4`,
    cpu: 10,
    mem: 20,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    disk: 30,
  })
}

type EntryListProps = {
  selectedEntry: EntryItem
  onChange: (entry: EntryItem) => void
}

const EntryList: React.FC<EntryListProps> = props => {
  const routeParams = useParams()
  const { onChange, selectedEntry } = props
  const [pageAllPublicEntries] = usePageAppEntriesLazyQuery()
  const columns: ProColumns<EntryItem>[] = [
    {
      title: '词条Key',
      dataIndex: 'key',
      copyable: true,
    },
    {
      title: '主语言',
      dataIndex: 'mainLangText',
      copyable: true,
      hideInSearch: true,
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
  ]
  return (
    <ProTable<EntryItem>
      columns={columns}
      request={async (params = {}, sort, filter) => {
        const res = await pageAllPublicEntries({
          variables: {
            pageNo: params.current,
            pageSize: params.pageSize,
            appId: Number(routeParams.id),
          },
        })
        const data = res?.data?.pageAppEntries
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
      rowClassName={record => {
        return record?.entry_id === selectedEntry?.entry_id
          ? styles['split-row-select-active']
          : ''
      }}
      toolbar={{
        actions: [
          <Button size="small" key="list" type="link">
            下载多语言模版
          </Button>,
          <Button size="small" key="list" type="primary">
            导入
          </Button>,
        ],
      }}
      onRow={record => {
        return {
          onClick: () => {
            if (record.entry_id) {
              onChange(record)
            }
          },
        }
      }}
    />
  )
}

const AppEntryEditPage: React.FC = () => {
  const params = useParams()
  const { data } = useGetAppInfoByIdQuery({
    variables: {
      getAppInfoByIdId: Number(params.id),
    },
  })
  const [current, setCurrent] = useState<EntryItem>()
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
      <ProCard colSpan={14} ghost>
        <EntryList onChange={cIp => setCurrent(cIp)} selectedEntry={current} />
      </ProCard>
      <ProCard colSpan={10} title={current?.mainLangText}>
        {current ? (
          <EntryForm
            initialFormData={{
              ...current,
              ...current.langs,
              entryId: current.entry_id,
              appId: Number(params.id),
            }}
          />
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                请在左侧表格选择词条编辑或是{' '}
                <EntryModal initialFormData={{ appId: Number(params.id) }}>
                  <a>新增词条</a>
                </EntryModal>
              </span>
            }
          />
        )}
      </ProCard>
    </ProCard>
  )
}

export default AppEntryEditPage
