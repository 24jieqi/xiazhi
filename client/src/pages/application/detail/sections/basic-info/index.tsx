import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components'
import React from 'react'
import { UploadFile } from 'antd/lib/upload/interface'
import { message } from 'antd'
import { useParams } from 'react-router-dom'
import { useUpdateAppBasicInfoMutation } from '@/graphql/operations/__generated__/app.generated'
import { getPictureUrlList } from '@/pages/application/add'
import {
  appSupportLangsOptions,
  appTypeOptions,
} from '@/pages/application/constant'
import { AppSection } from '../interface'

interface AppBasicInfoProps extends AppSection {}

function getFileMime(url: string) {
  const reg = /\.(png|jpg|jpeg|gif|webp)$/
  return reg.exec(url)
}

function generateUploadFileList(files: string[]) {
  if (!files || !files.length) {
    return []
  }
  const result: UploadFile[] = files.map((file, index) => ({
    status: 'done',
    url: file,
    uid: `cover_${index}`,
    name: `cover_${index}${getFileMime(file)?.[0] || ''}`,
  }))
  return result
}

const AppBasicInfo: React.FC<AppBasicInfoProps> = ({ app }) => {
  const params = useParams()
  const [updateAppBasicInfo] = useUpdateAppBasicInfoMutation()
  async function handleUpdateAppInfo(formData: Record<string, any>) {
    await updateAppBasicInfo({
      variables: {
        appId: Number(params.id),
        type: formData.type,
        pictures: getPictureUrlList(formData.pictures),
        description: formData.description,
      },
    })
    message.success('编辑应用成功！')
  }
  return (
    <ProForm
      onFinish={handleUpdateAppInfo}
      initialValues={{
        name: app.name,
        description: app.description,
        type: app.type,
        languages: app.languages,
        pictures: generateUploadFileList(app.pictures),
      }}>
      <ProFormText
        name="name"
        label="应用名称"
        width="md"
        placeholder="请输入应用名称"
        readonly
      />
      <ProFormTextArea
        name="description"
        label="应用简介"
        width="lg"
        tooltip="最长为 500 字"
        placeholder="请输入应用简介"
        rules={[
          { type: 'string', max: 500, message: '应用简介长度最长为500字' },
        ]}
      />
      <ProForm.Group>
        <ProFormSelect
          width="sm"
          rules={[{ required: true, message: '请选择应用类型' }]}
          label="应用类型"
          name="type"
          options={appTypeOptions}
        />
        <ProFormSelect
          label="支持语言"
          name="languages"
          mode="multiple"
          width="md"
          readonly
          options={appSupportLangsOptions}
        />
      </ProForm.Group>
      <ProFormUploadButton
        name="pictures"
        label="应用图片"
        max={2}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        action="/_files/upload"
      />
    </ProForm>
  )
}

export default AppBasicInfo
