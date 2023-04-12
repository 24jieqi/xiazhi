import { ProList } from '@ant-design/pro-components'
import { Button, Modal, Switch, Tag, Typography } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ExclamationCircleOutlined, RedoOutlined } from '@ant-design/icons'
import {
  useArchivedAppMutation,
  useChangeAccessStatusMutation,
  useDeleteAppMutation,
  useGetAccessKeyByAppIdQuery,
  useRefreshAccessKeyMutation,
} from '@/graphql/operations/__generated__/app.generated'
import AsyncSwitch from '@/components/async-switch'
import { AppSection } from '../interface'

const { Paragraph } = Typography

interface AccessKeyManagementProps extends AppSection {}

const AccessKeyManagement: React.FC<AccessKeyManagementProps> = () => {
  const params = useParams()
  const appId = Number(params.id)

  const {
    data,
    loading: getAccessInfoLoading,
    refetch,
  } = useGetAccessKeyByAppIdQuery({
    variables: {
      getAccessKeyByAppIdId: appId,
    },
  })
  const [refreshAccessKey, { loading }] = useRefreshAccessKeyMutation()
  const [changeAppAccessStatus] = useChangeAccessStatusMutation()
  const [archiveApp] = useArchivedAppMutation()
  const [deleteApp] = useDeleteAppMutation()

  async function handleRefreshAccessKey() {
    await refreshAccessKey({
      variables: {
        refreshAccessKeyId: appId,
      },
    })
    refetch()
  }

  async function handleChangeAppAccessStatus(
    type: 'access' | 'push',
    checked: boolean,
  ) {
    try {
      await changeAppAccessStatus({
        variables: {
          appId,
          [type]: checked,
        },
      })
      return checked
    } catch (error) {
      return checked
    }
  }

  async function handleArchivedApp() {
    Modal.confirm({
      title: '请确认是否归档此应用？',
      icon: <ExclamationCircleOutlined />,
      content:
        '归档是不可逆操作，归档后应用无法添加修改词条，不可编辑应用信息，但仍然可以正常访问。',
      onOk: async () => {
        await archiveApp({
          variables: {
            archivedAppId: appId,
          },
        })
        refetch()
      },
    })
  }

  async function handleDeleteApp() {
    Modal.confirm({
      title: '请确认是否删除此应用？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆，删除后应用不能再访问',
      onOk: async () => {
        await deleteApp({
          variables: {
            deleteAppId: appId,
          },
        })
        refetch()
        return true
      },
    })
  }

  const dataSource = [
    {
      title: '可访问',
      description: '用户设置公共API接口能否访问此应用的词条信息',
      actions: [
        <AsyncSwitch
          key="access"
          defaultChecked={data?.getAccessKeyByAppId?.access}
          onChange={checked => handleChangeAppAccessStatus('access', checked)}
        />,
      ],
    },
    {
      title: '可推送',
      description: '用户设置能否通过API推送词条到应用',
      actions: [
        <AsyncSwitch
          key="push"
          defaultChecked={data?.getAccessKeyByAppId?.push}
          onChange={checked => handleChangeAppAccessStatus('push', checked)}
        />,
      ],
    },
    {
      title: 'Access Key',
      subTitle: <Tag color="#5BD8A6">应用访问</Tag>,
      actions: [
        <Paragraph key="assessKey" style={{ marginBottom: 0 }} copyable>
          {data?.getAccessKeyByAppId?.accessKey}
        </Paragraph>,
        <Button
          onClick={handleRefreshAccessKey}
          loading={loading}
          key="refresh"
          type="link"
          style={{ paddingRight: 0, paddingLeft: 0 }}>
          <RedoOutlined key="refresh" />
          刷新
        </Button>,
      ],
      description: '用于访问APP词条权限认证',
    },
    {
      title: '归档',
      description:
        '归档后，应用将被锁定，无法更改应用基本信息以及词条信息，无法邀请协作者',
      actions: [
        <Switch
          key="archived"
          checked={data?.getAccessKeyByAppId?.archived}
          disabled={data?.getAccessKeyByAppId?.archived}
          onChange={handleArchivedApp}
        />,
      ],
    },
    {
      title: '删除',
      description: '删除后，应用将不可见，也不能访问，并且不可恢复',
      actions: [
        <Switch
          key="deleted"
          checked={data?.getAccessKeyByAppId?.deleted}
          disabled={data?.getAccessKeyByAppId?.deleted}
          onChange={handleDeleteApp}
        />,
      ],
    },
  ]

  return (
    <ProList<any>
      loading={getAccessInfoLoading}
      showActions="always"
      onItem={(record: any) => {
        return {}
      }}
      metas={{
        title: {},
        subTitle: {},
        description: {},
        actions: {},
      }}
      headerTitle="访问权限key设置"
      dataSource={dataSource}
    />
  )
}

export default AccessKeyManagement
