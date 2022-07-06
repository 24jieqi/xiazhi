import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProCard, ProTable } from '@ant-design/pro-components'
import { Tag, Button, Empty } from 'antd'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import { usePageAppEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import { EntryItem } from '@/graphql/generated/types'
import EntryModal from '@/pages/entry/components/entry-modal'
import EntryForm from '@/pages/entry/components/entry-form'
import { appTypeOptions } from '../constant'
import styles from './split.module.less'
import ModifyRecordsModal from '@/pages/entry/components/modify-record-modal'

type EntryListProps = {
  selectedEntry: EntryItem
  onChange: (entry: EntryItem) => void
  actionRef: React.MutableRefObject<ActionType>
}

const EntryList: React.FC<EntryListProps> = props => {
  const routeParams = useParams()
  const { onChange, selectedEntry, actionRef } = props
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
            startTime: dayjs(value[0]).valueOf(),
            endTime: dayjs(value[1]).valueOf(),
          }
        },
      },
    },
    {
      title: '高级筛选',
      dataIndex: 'state',
      valueType: 'checkbox',
      hideInTable: true,
      valueEnum: {
        latest: {
          text: '最近上传',
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
      key: 'updateTime',
      dataIndex: 'modifyRecords',
      hideInSearch: true,
      render(_, record) {
        return (
          <ModifyRecordsModal modifyRecords={record?.modifyRecords || []} />
        )
      },
    },
  ]
  return (
    <ProTable<EntryItem>
      actionRef={actionRef}
      columns={columns}
      request={async (params = {}, sort, filter) => {
        const res = await pageAllPublicEntries({
          variables: {
            pageNo: params.current,
            pageSize: params.pageSize,
            appId: Number(routeParams.id),
            startTime: params.startTime,
            endTime: params.endTime,
            key: params.key,
            mainLangText: params.mainLangText,
            latest: (params.state as any[])?.includes('latest'),
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
  const actionRef = useRef<ActionType>()
  const { data } = useGetAppInfoByIdQuery({
    variables: {
      getAppInfoByIdId: Number(params.id),
    },
  })
  const [current, setCurrent] = useState<EntryItem>()
  const currentType = appTypeOptions.find(
    item => item.value === data?.getAppInfoById?.type,
  )
  function handleAddOrUpdateSuccess() {
    actionRef.current?.reload()
  }
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
        <EntryList
          actionRef={actionRef}
          onChange={cIp => setCurrent(cIp)}
          selectedEntry={current}
        />
      </ProCard>
      <ProCard colSpan={10} title={current?.mainLangText}>
        {current ? (
          <EntryForm
            onActionSuccess={handleAddOrUpdateSuccess}
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
