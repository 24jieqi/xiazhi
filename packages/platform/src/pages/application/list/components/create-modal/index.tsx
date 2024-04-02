import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components'
import type { UploadFile } from 'antd'
import { Button, message } from 'antd'
import React from 'react'

import langMap from '@/config/lang-map'
import { useCreateAppMutation } from '@/graphql/operations/app/__generated__/index.generated'
import { getPictureUrlList } from '@/utils'

export interface FormValues {
  name: string
  languages: string[]
  pictures?: UploadFile[]
  description?: string
}

export const langKeys = Object.keys(langMap)

/**
 * 语言下拉选项
 */
export const appSupportLangsOptions = langKeys.map(lang => ({
  value: lang,
  label: langMap[lang].zhName,
  disabled: lang === 'zh',
}))

interface CreateAppModalProps {
  onCreateSuccess?: () => void
}

const CreateAppModal: React.FC<CreateAppModalProps> = ({ onCreateSuccess }) => {
  const [createApp] = useCreateAppMutation()
  async function handleCreateApp(formData: FormValues) {
    await createApp({
      variables: {
        input: {
          ...formData,
          pictures: getPictureUrlList(formData.pictures),
        },
      },
    })
    message.success('创建应用成功！')
    onCreateSuccess?.()
    return true
  }
  return (
    <ModalForm<FormValues>
      title="创建应用"
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={{
        languages: ['zh'],
      }}
      preserve={false}
      onFinish={handleCreateApp}
      trigger={
        <Button type="primary" key="create" icon={<PlusOutlined />}>
          创建应用
        </Button>
      }>
      <ProForm.Group>
        <ProFormText
          width="md"
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入应用名称' }]}
        />
        <ProFormSelect
          label="支持语言"
          name="languages"
          mode="multiple"
          width="md"
          rules={[{ required: true, message: '请选择支持语言' }]}
          options={appSupportLangsOptions}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="md" label="简介" name="description" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormUploadButton
          name="pictures"
          label="应用图片"
          max={3}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
          }}
          action="/_upload"
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default CreateAppModal
