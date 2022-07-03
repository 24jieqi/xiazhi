/* eslint-disable max-params */
/* eslint-disable react/no-unstable-nested-components */
import { AppTypeEnum, LanguageTypeEnum } from '@/graphql/generated/types'
import { useCreateAppMutation } from '@/graphql/operations/__generated__/app.generated'
import {
  ProFormInstance,
  ProFormUploadButton,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormList,
} from '@ant-design/pro-components'
import { message } from 'antd'
import React, { useRef } from 'react'

export default () => {
  const formRef = useRef<ProFormInstance>()
  const [createApp] = useCreateAppMutation()
  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        onFinish={async values => {
          await createApp({
            variables: {
              name: values.name,
              description: values.description,
              languages: values.languages,
              type: values.type,
              pictures: [],
            },
          })
          message.success('应用创建成功！')
          return true
        }}
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
              options={[
                {
                  value: AppTypeEnum.Contact,
                  label: '社交',
                },
                {
                  value: AppTypeEnum.Education,
                  label: '教育',
                },
                {
                  value: AppTypeEnum.Efficiency,
                  label: '效率',
                },
                {
                  value: AppTypeEnum.Finance,
                  label: '金融',
                },
                {
                  value: AppTypeEnum.Game,
                  label: '游戏',
                },
                {
                  value: AppTypeEnum.Music,
                  label: '音乐',
                },
                {
                  value: AppTypeEnum.Tool,
                  label: '工具',
                },
                {
                  value: AppTypeEnum.Other,
                  label: '其它',
                },
              ]}
            />
            <ProFormSelect
              label="支持语言"
              name="languages"
              mode="multiple"
              width="md"
              rules={[{ required: true, message: '请选择支持语言' }]}
              options={[
                {
                  value: LanguageTypeEnum.Chinese,
                  label: '中文',
                },
                {
                  value: LanguageTypeEnum.English,
                  label: '英语',
                },
                {
                  value: LanguageTypeEnum.Thai,
                  label: '泰语',
                },
                {
                  value: LanguageTypeEnum.Vietnamese,
                  label: '越南语',
                },
              ]}
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
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
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
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
            />
            <ProFormRadio.Group
              name="push"
              label="可推送"
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
            />
            <ProFormRadio.Group
              name="auto_translate"
              label="辅助翻译"
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
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
                mode="multiple"
                options={[
                  {
                    label: '管理',
                    value: 'admin',
                  },
                  {
                    label: '编辑',
                    value: 'edit',
                  },
                  {
                    label: '只读',
                    value: 'readonly',
                  },
                ]}
              />
            </ProForm.Group>
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  )
}
