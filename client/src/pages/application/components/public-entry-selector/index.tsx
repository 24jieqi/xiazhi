import { ParamsType, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import React, { cloneElement, useState } from 'react'
import { EntryItem } from '@/graphql/generated/types'
import { usePageAllPublicEntriesLazyQuery } from '@/graphql/operations/__generated__/entry.generated'
import { useGetAppInfoByIdQuery } from '@/graphql/operations/__generated__/app.generated'
import { getGivenLangsColumns, langTableColumns } from '../../constant'

interface PublicEntrySelectorProps {
  appId: number
  children?: React.ReactElement
}

const PublicEntrySelector: React.FC<PublicEntrySelectorProps> = ({
  appId,
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [pageAllPublicEntries] = usePageAllPublicEntriesLazyQuery()
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
        width={960}>
        <ProTable<EntryItem>
          columns={columns}
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
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </Modal>
    </>
  )
}

export default PublicEntrySelector
