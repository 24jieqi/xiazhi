import { ProFormText, ProList } from '@ant-design/pro-components'
import { Button, Form, Input, Popover, Switch, Tag, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RedoOutlined } from '@ant-design/icons'
import {
  useGetAccessKeyByAppIdQuery,
  useRefreshAccessKeyMutation,
} from '@/graphql/operations/__generated__/app.generated'

const { Paragraph } = Typography

const AccessKeyManagement: React.FC = () => {
  const params = useParams()
  const [form] = Form.useForm()
  const { data } = useGetAccessKeyByAppIdQuery({
    variables: {
      getAccessKeyByAppIdId: Number(params.id),
    },
  })
  const [refreshAccessKey, { loading }] = useRefreshAccessKeyMutation()
  async function handleRefreshAccessKey() {
    const res = await refreshAccessKey({
      variables: {
        refreshAccessKeyId: Number(params.id),
      },
    })
    form.setFieldsValue({
      accessKey: res.data?.refreshAccessKey,
    })
  }
  const dataSource = [
    {
      title: '可访问',
      description: '用户设置公共API接口能否访问此应用的词条信息',
      actions: [
        <Form.Item noStyle key="access" name="access" valuePropName="checked">
          <Switch disabled />
        </Form.Item>,
      ],
    },
    {
      title: '可推送',
      description: '用户设置能否通过API推送词条到应用',
      actions: [
        <Form.Item key="push" name="push" noStyle valuePropName="checked">
          <Switch disabled />
        </Form.Item>,
      ],
    },
    {
      title: 'Access Key',
      subTitle: <Tag color="#5BD8A6">应用访问</Tag>,
      actions: [
        <Form.Item shouldUpdate key="accessKey" noStyle>
          {({ getFieldValue }) => {
            const accessKey = getFieldValue('accessKey')
            return (
              <Paragraph style={{ marginBottom: 0 }} copyable>
                {accessKey}
              </Paragraph>
            )
          }}
        </Form.Item>,
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
        <Form.Item
          key="archived"
          noStyle
          name="archived"
          valuePropName="checked">
          <Switch key="access" disabled />
        </Form.Item>,
      ],
    },
    {
      title: '删除',

      description: '删除后，应用将不可见，也不能访问，并且不可恢复',
      actions: [
        <Form.Item key="deleted" noStyle name="deleted" valuePropName="checked">
          <Switch disabled />
        </Form.Item>,
      ],
    },
  ]
  useEffect(() => {
    if (data?.getAccessKeyByAppId) {
      form.setFieldsValue({
        ...data?.getAccessKeyByAppId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getAccessKeyByAppId])
  return (
    <Form form={form}>
      <ProList<any>
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
    </Form>
  )
}

export default AccessKeyManagement
