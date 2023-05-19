/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import {
  ProFormInstance,
  ProFormUploadButton,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components'
import { message } from 'antd'
import React, { useRef } from 'react'
import { UploadFile } from 'antd/lib/upload/interface'
import { useNavigate } from 'react-router-dom'
import { useCreateAppMutation } from '@/graphql/operations/__generated__/app.generated'
import { appSupportLangsOptions, appTypeOptions } from '../constant'
// import { CollaboratorRoleEnum } from '@/graphql/generated/types'

interface FileVO {
  data: string
}

// const whetherOptions = [
//   {
//     label: '是',
//     value: true,
//   },
//   {
//     label: '否',
//     value: false,
//   },
// ]

// const permissionOptions = [
//   {
//     label: '访客',
//     value: CollaboratorRoleEnum.Guest,
//   },
//   {
//     label: '成员',
//     value: CollaboratorRoleEnum.Translator,
//   },
//   {
//     label: '管理员',
//     value: CollaboratorRoleEnum.Manager,
//   },
// ]

export function getPictureUrlList(fileList: UploadFile<Partial<FileVO>>[]) {
  if (!fileList || !fileList.length) {
    return []
  }
  return fileList
    .filter(file => file.status === 'done')
    .map(f => f?.response?.data || f?.url)
}

const Add: React.FC = () => {
  const formRef = useRef<ProFormInstance>()
  const navigate = useNavigate()

  const [createApp] = useCreateAppMutation()

  async function handleFinish(values) {
    await createApp({
      variables: {
        name: values.name,
        description: values.description,
        languages: values.languages,
        type: values.type,
        pictures: getPictureUrlList(values.pictures),
      },
    })
    message.success('应用创建成功！')
    navigate(-1)
    return true
  }

  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        onFinish={handleFinish}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}>
        <StepsForm.StepForm<{
          name: string
        }>
          name="basic"
          title="创建应用"
          stepProps={{
            description: '填写基本信息，创建应用',
          }}
          onFinish={async () => {
            return true
          }}>
          <ProFormText
            name="name"
            label="应用名称"
            width="md"
            tooltip="最长为 24 位"
            placeholder="请输入应用名称"
            rules={[{ required: true }]}
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
              rules={[{ required: true, message: '请选择支持语言' }]}
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
            action="/_upload"
          />
        </StepsForm.StepForm>
        {/* <StepsForm.StepForm<{
          checkbox: string
        }>
          name="permission"
          title="设置权限"
          stepProps={{
            description: '选择应用的权限',
          }}
          onFinish={async () => {
            return true
          }}>
          <ProForm.Group>
            <ProFormRadio.Group
              name="access"
              label="可访问"
              options={whetherOptions}
            />
            <ProFormRadio.Group
              name="push"
              label="可推送"
              options={whetherOptions}
            />
            <ProFormRadio.Group
              name="auto_translate"
              label="辅助翻译"
              options={whetherOptions}
            />
          </ProForm.Group>
          <ProFormList
            initialValue={[
              {
                email: '',
                permission: undefined,
              },
            ]}
            creatorButtonProps={{
              creatorButtonText: '添加协作者',
            }}
            name="collaborator"
            label="协作者">
            <ProForm.Group>
              <ProFormText label="邮箱" name="email" />
              <ProFormSelect
                width="lg"
                label="权限"
                name="permission"
                options={permissionOptions}
              />
            </ProForm.Group>
          </ProFormList>
        </StepsForm.StepForm> */}
      </StepsForm>
    </ProCard>
  )
}

export default Add
