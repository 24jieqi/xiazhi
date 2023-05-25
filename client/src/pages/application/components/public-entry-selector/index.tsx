import {
  ActionType,
  ParamsType,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components'
import { Alert, Button, Modal, Space, Table, message } from 'antd'
import React, { cloneElement, useRef, useState } from 'react'
import { WarningOutlined } from '@ant-design/icons'
import { EntryItem } from '@/graphql/generated/types'
import {
  usePagePublicEntriesByAppLazyQuery,
  useTransformEntryForAppMutation,
} from '@/graphql/operations/__generated__/entry.generated'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import { getGivenLangsColumns } from '../../constant'

interface PublicEntrySelectorProps {
  appId: number
  onOk?: () => void
  children?: React.ReactElement
}

const PublicEntrySelector: React.FC<PublicEntrySelectorProps> = ({
  appId,
  children,
  onOk,
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const formActionRef = useRef<ActionType>()
  const [pageAllPublicEntries] = usePagePublicEntriesByAppLazyQuery()
  const [transformEntry] = useTransformEntryForAppMutation()
  const { data } = useGetAppInfoByIdQuery({
    variables: {
      id: appId,
    },
  })
  function handleShowModal() {
    setVisible(true)
  }
  function handleHideModal() {
    setVisible(false)
  }
  async function handleMultiAdd(rowKeys: number[]) {
    await transformEntry({
      variables: {
        appId,
        entryIds: rowKeys,
      },
    })
    message.success('词条导入成功')
    formActionRef.current.reload()
  }
  function handleOk() {
    handleHideModal()
    onOk?.()
  }
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
        key: params.key,
        mainLangText: params.mainLangText,
        appId,
      },
    })
    const data = res?.data?.pagePublicEntriesByApp
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
      editable: false,
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
      children: getGivenLangsColumns(data?.getAppInfoById?.languages),
      hideInSearch: true,
    },
    {
      title: '主语言',
      dataIndex: 'mainLangText',
      hideInTable: true,
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
  ]
  const triggerElement = children ? (
    cloneElement(children, { onClick: handleShowModal })
  ) : (
    <Button size="small" type="primary" onClick={handleShowModal}>
      公共词库导入
    </Button>
  )
  return (
    <>
      {triggerElement}
      <Modal
        title="公共词条导入"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOk}
        width={960}>
        <ProTable<EntryItem>
          columns={columns}
          actionRef={formActionRef}
          cardBordered
          bordered
          scroll={{ x: 960 }}
          request={handleRequest}
          rowKey="entry_id"
          search={{
            labelWidth: 'auto',
          }}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            getCheckboxProps: record => ({
              disabled: record.existInApp,
            }),
          }}
          tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
            return (
              <Space size={24}>
                <span>
                  已选 {selectedRowKeys.length} 项
                  <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                    取消选择
                  </a>
                </span>
              </Space>
            )
          }}
          tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
            return (
              <a onClick={() => handleMultiAdd(selectedRowKeys as number[])}>
                批量添加
              </a>
            )
          }}
          pagination={{
            pageSize: 10,
          }}
          toolbar={{
            subTitle: (
              <Alert
                type="warning"
                showIcon
                icon={<WarningOutlined />}
                message="不可选词条为当前应用已存在同名词条"
              />
            ),
          }}
          dateFormatter="string"
          headerTitle="公共词条库"
        />
      </Modal>
    </>
  )
}

export default PublicEntrySelector
