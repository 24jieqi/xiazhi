import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  useCreateEntryMutation,
  useUpdateEntryMutation,
} from '@/graphql/operations/__generated__/entry.generated'
import {
  LanguageTypeEnum,
  appSupportLangsTableEnum,
  langKeys,
} from '@/pages/application/constant'
import { entryKeyValidator } from '../validator'
import { generateEntryKey } from '../utils'

interface EntryModalProps {
  children?: JSX.Element
  initialFormData?: any
  supportLanguageArray: string[]
  onActionSuccess?: () => void
}

function omit(obj: any, keys: string[]) {
  const returned = { ...obj }
  for (const key of keys) {
    delete returned[key]
  }
  return returned
}

const EntryModal: React.FC<EntryModalProps> = ({
  children,
  initialFormData,
  supportLanguageArray,
  onActionSuccess,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [createEntry] = useCreateEntryMutation()
  const [updateEntry] = useUpdateEntryMutation()
  const [form] = ProForm.useForm()
  function handleValuesChange(changedValues: Record<string, any>, values) {
    const keys = Object.keys(changedValues)
    if (keys.includes(LanguageTypeEnum.en) && values.autoGenerate) {
      form.setFieldsValue({
        key: generateEntryKey(changedValues[LanguageTypeEnum.en]),
      })
    }
  }
  function handleVisibleChange(visible: boolean) {
    if (!visible) {
      form.resetFields()
    }
    setIsShow(visible)
  }
  // 设置默认值
  useEffect(() => {
    if (typeof initialFormData !== 'undefined' && !isShow) {
      form.setFieldsValue({ ...initialFormData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFormData, isShow])
  return (
    <ModalForm
      form={form}
      onValuesChange={handleValuesChange}
      onVisibleChange={handleVisibleChange}
      visible={isShow}
      initialValues={{ autoGenerate: true }}
      modalProps={{
        bodyStyle: {
          maxHeight: 500,
          overflowY: 'scroll',
        },
      }}
      trigger={
        children || (
          <Button type="primary">
            <PlusOutlined />
            新增词条
          </Button>
        )
      }
      onFinish={async formData => {
        // 此时代表编辑
        if (initialFormData?.entryId) {
          await updateEntry({
            variables: {
              appId: initialFormData.appId,
              entryId: initialFormData.entryId,
              key: formData.key,
              langs: {
                ...omit(formData, ['key']),
              },
              isRollback: false,
            },
          })
          message.success('修改词条成功！')
        } else {
          const allData = form.getFieldsValue(true)
          await createEntry({
            variables: {
              key: formData.key,
              appId: allData.appId,
              langs: {
                ...omit(formData, ['key']),
              },
            },
          })
          message.success('新增词条成功！')
        }
        onActionSuccess?.()
        return true
      }}>
      <ProForm.Item shouldUpdate>
        {({ getFieldValue }) => {
          const appId = getFieldValue('appId')
          const entryId = getFieldValue('entryId')
          const autoGenerate = getFieldValue('autoGenerate')
          return (
            <ProFormText
              disabled={autoGenerate}
              validateTrigger="onBlur"
              rules={[
                {
                  validator: entryKeyValidator(appId, entryId),
                },
              ]}
              width="md"
              name="key"
              label="词条key"
              tooltip="词条可读的描述，应用内唯一"
              placeholder="请输入词条key"
              addonAfter={
                <ProFormCheckbox noStyle name="autoGenerate">
                  自动生成
                </ProFormCheckbox>
              }
            />
          )
        }}
      </ProForm.Item>
      <ProForm.Group>
        {supportLanguageArray
          .filter(lang => langKeys.includes(lang))
          .map((lang, index) => {
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
                label={appSupportLangsTableEnum[lang]?.text}
                placeholder="请输入多语言词条"
              />
            )
          })}
      </ProForm.Group>
    </ModalForm>
  )
}

export default EntryModal
