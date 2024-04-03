import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { isDef } from '@fruits-chain/utils'
import { Button, message } from 'antd'
import omit from 'lodash/omit'
import { pinyin } from 'pinyin-pro'
import React, { useEffect, useRef, useState } from 'react'

import type { App, Entry } from '@/graphql/generated/types'
import {
  useCreateEntryMutation,
  useEditEntryMutation,
} from '@/graphql/operations/entry/__generated__/index.generated'
import {
  languageOptions,
  languageTypeMap,
  languageZhNameMap,
} from '@/pages/entry/constant'

function generateEntryKey(langText: string) {
  return langText
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word
      }
      return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    .join('_')
}

interface EntryModalProps {
  children?: JSX.Element
  entry?: Entry
  app?: App
  onActionSuccess?: () => void
}

type FormValues = {
  autoGenerate: boolean
  langs: string[]
  key: string
} & Record<string, string>

const EntryModal: React.FC<EntryModalProps> = ({
  children,
  entry,
  onActionSuccess,
  app,
}) => {
  const [form] = ProForm.useForm<FormValues>()
  const [open, setOpen] = useState<boolean>(false)

  const [createEntry] = useCreateEntryMutation()
  const [updateEntry] = useEditEntryMutation()
  // 对话框打开时设置表单
  useEffect(() => {
    if (isDef(entry) && open) {
      form.setFieldsValue({
        key: entry.key,
        langs: app.languages,
        ...entry.langs,
      })
    }
  }, [entry, open, form, app])

  function handleValuesChange(changedValues: Record<string, any>, values) {
    const keys = Object.keys(changedValues)
    if (
      keys.includes(languageTypeMap.zh) &&
      values.autoGenerate &&
      !entry?.id
    ) {
      const pinYinStr = pinyin(changedValues[languageTypeMap.zh], {
        toneType: 'none',
      })
      form.setFieldsValue({
        key: generateEntryKey(pinYinStr),
      })
    }
  }

  async function handleFinish(formData: FormValues) {
    // 此时代表编辑
    if (entry?.id) {
      await updateEntry({
        variables: {
          entryId: entry.id,
          langs: {
            ...omit(formData, ['key', 'langs', 'autoGenerate']),
          },
        },
      })
      message.success('修改词条成功！')
    } else {
      await createEntry({
        variables: {
          input: {
            key: formData.key,
            appId: app.appId,
            langs: {
              ...omit(formData, ['key', 'langs', 'autoGenerate']),
            },
          },
        },
      })
      message.success('新增词条成功！')
    }
    onActionSuccess?.()
    return true
  }

  function handleVisibleChange(visible: boolean) {
    setOpen(visible)
  }
  return (
    <ModalForm<FormValues>
      preserve={false}
      title={isDef(entry) ? '编辑词条' : '新增词条'}
      form={form}
      onValuesChange={handleValuesChange}
      onOpenChange={handleVisibleChange}
      open={open}
      initialValues={{ autoGenerate: true, langs: ['zh', 'en'] }}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
      }}
      trigger={
        children || (
          <Button type="primary">
            <PlusOutlined />
            新增词条
          </Button>
        )
      }
      onFinish={handleFinish}>
      <ProForm.Item shouldUpdate>
        {({ getFieldValue }) => {
          const autoGenerate = getFieldValue('autoGenerate')
          return (
            <ProFormText
              disabled={autoGenerate}
              validateTrigger="onBlur"
              width="md"
              name="key"
              label="词条key"
              tooltip="词条可读的描述，应用内唯一"
              placeholder="请输入词条key"
              addonAfter={
                <ProFormCheckbox
                  noStyle
                  name="autoGenerate"
                  disabled={isDef(entry)}>
                  自动生成
                </ProFormCheckbox>
              }
            />
          )
        }}
      </ProForm.Item>
      <ProFormSelect
        width="md"
        mode="multiple"
        showSearch
        name="langs"
        placeholder="请选择支持的语言"
        label="多语言"
        options={app?.languages.map(item =>
          languageOptions.find(lang => lang.value === item),
        )}
      />
      <ProForm.Item dependencies={['langs']}>
        {({ getFieldValue }) => {
          const _langs: string[] = getFieldValue('langs') || []
          return (
            <ProForm.Group>
              {_langs.map((lang, index) => {
                const isRequired = lang === 'zh'
                return (
                  <ProFormText
                    rules={
                      isRequired
                        ? [{ required: true, message: '请输入中文词条' }]
                        : []
                    }
                    key={index}
                    name={lang}
                    width="md"
                    label={languageZhNameMap[lang]?.text}
                    placeholder="请输入多语言词条"
                  />
                )
              })}
            </ProForm.Group>
          )
        }}
      </ProForm.Item>
    </ModalForm>
  )
}

export default EntryModal
