import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components'
import React from 'react'
import { Avatar, Button, Popover, Space, Switch, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { AppItem } from '@/graphql/generated/types'
import { useGetCurrentAppsLazyQuery } from '@/graphql/operations/__generated__/app.generated'
import {
  APP_DETAIL,
  EDIT_APP,
  NEW_APP,
} from '@/router/config/main-routes/application/path'
import useCollaboratorPermissions from '@/pages/auth/useCollaboratorPermission'
import { appSupportLangsTableEnum, appTypeTableEnum } from '../constant'
import AccessSwitch from '../components/access-switch'

const AppListPage: React.FC = () => {
  const navigate = useNavigate()
  const { checkIsCollaborator } = useCollaboratorPermissions()
  function handleRedirectAppSetting(app: AppItem) {
    navigate(`${APP_DETAIL}/${app.app_id}`)
  }
  function handleRedirectAppEdit(app: AppItem) {
    navigate(`${EDIT_APP}/${app.app_id}`)
  }
  function handleRedirectAppAdd() {
    navigate(NEW_APP)
  }
  const columns: ProColumns<AppItem>[] = [
    {
      title: '应用名称',
      valueType: 'text',
      dataIndex: 'name',
      width: 300,
      render(_, record) {
        const isCollaborator = checkIsCollaborator(record.creatorId)
        return (
          <Space>
            {isCollaborator ? (
              <span>{record.name}</span>
            ) : (
              <a onClick={() => handleRedirectAppSetting(record)}>
                {record.name}
              </a>
            )}
            <Popover
              title="创建者信息"
              content={
                <div>
                  <p>{record.creator.name}</p>
                  <p>{record.creator.email}</p>
                </div>
              }>
              <Avatar
                src={
                  record.creator?.avatar || 'https://joeschmoe.io/api/v1/random'
                }
              />
            </Popover>
            {isCollaborator ? <Tag color="#108ee9">协作</Tag> : null}
          </Space>
        )
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: appTypeTableEnum,
    },
    {
      title: '语言支持',
      dataIndex: 'languages',
      ellipsis: true,
      valueType: 'checkbox',
      valueEnum: appSupportLangsTableEnum,
    },
    {
      title: '应用图片',
      dataIndex: 'pictures',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '词条数',
      dataIndex: 'entryCount',
      align: 'right',
      render(dom, entity) {
        return <a onClick={() => handleRedirectAppEdit(entity)}>{dom}</a>
      },
      hideInSearch: true,
    },
    {
      title: '可访问',
      tooltip: '表示是否可以通过相关接口访问应用词条',
      dataIndex: 'access',
      valueType: 'switch',
      initialValue: true,
      align: 'center',
      render: (_, record) => {
        return (
          <AccessSwitch
            disabled={checkIsCollaborator(record.creatorId)}
            appId={record.app_id}
            type="access"
            initialChecked={record.access}
          />
        )
      },
    },
    {
      title: '访问key',
      dataIndex: 'accessKey',
      copyable: true,
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '可推送',
      dataIndex: 'push',
      valueType: 'switch',
      initialValue: true,
      tooltip: '表示是否可以通过相关接口推送词条到平台',
      align: 'center',
      render: (_, record) => {
        return (
          <AccessSwitch
            disabled={checkIsCollaborator(record.creatorId)}
            appId={record.app_id}
            type="push"
            initialChecked={record.push}
          />
        )
      },
    },
    // {
    //   title: '操作',
    //   key: 'option',
    //   width: 120,
    //   valueType: 'option',
    //   render: (_, row, index, action) => [
    //     <a key="achieve">归档</a>,
    //     <a key="delete">删除</a>,
    //   ],
    // },
  ]
  const [getCurrentApps] = useGetCurrentAppsLazyQuery()
  return (
    <ProCard title="我的应用">
      <ProTable<AppItem>
        columns={columns}
        scroll={{ x: 1200 }}
        request={async (params: any = {}, sort, filter) => {
          const res = await getCurrentApps({
            variables: {
              ...params,
            },
          })
          const data = res?.data?.getCurrentApps
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
        pagination={false}
        dateFormatter="string"
        headerTitle="应用列表"
        // eslint-disable-next-line react/no-unstable-nested-components
        toolBarRender={() => [
          <Button
            size="small"
            type="primary"
            key="add"
            onClick={handleRedirectAppAdd}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
      />
    </ProCard>
  )
}

export default AppListPage
