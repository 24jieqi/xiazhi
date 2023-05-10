import {
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import React, { useEffect } from 'react'
import { pinyin } from 'pinyin-pro'
import { flatten } from 'lodash'
import {
  useCreateEntryMutation,
  useUpdateEntryMutation,
} from '@/graphql/operations/__generated__/entry.generated'
import {
  LanguageTypeEnum,
  appSupportLangsTableEnum,
} from '@/pages/application/constant'
import { entryKeyValidator } from '../validator'
import { generateEntryKey } from '../utils'

interface EntryFormProps {
  children?: JSX.Element
  initialFormData?: any
  supportLanguageArray: string[]
  /**
   * 当编辑/新增词条成功时触发
   */
  onActionSuccess?: () => void
}

function omit(obj: any, keys: string[]) {
  const returned = { ...obj }
  for (const key of keys) {
    delete returned[key]
  }
  return returned
}

const EntryForm: React.FC<EntryFormProps> = ({
  initialFormData,
  supportLanguageArray,
  onActionSuccess,
}) => {
  const [form] = ProForm.useForm()

  const [createEntry] = useCreateEntryMutation()
  const [updateEntry] = useUpdateEntryMutation()

  // 设置默认值
  useEffect(() => {
    if (typeof initialFormData !== 'undefined') {
      // 先重置再设置，否则可能出现数据混乱的问题
      form.resetFields()
      form.setFieldsValue({ ...initialFormData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFormData])

  function handleValuesChange(changedValues: Record<string, any>, values) {
    const keys = Object.keys(changedValues)
    if (
      keys.includes(LanguageTypeEnum.zh) &&
      values.autoGenerate &&
      !initialFormData.entryId
    ) {
      const pinYinStr = pinyin(changedValues[LanguageTypeEnum.zh])
      form.setFieldsValue({
        key: generateEntryKey(pinYinStr),
      })
    }
  }

  async function handleFinish(formData) {
    // 此时代表编辑
    if (initialFormData?.entryId) {
      await updateEntry({
        variables: {
          appId: initialFormData.appId,
          entryId: initialFormData.entryId,
          key: formData.key,
          isRollback: false,
          langs: {
            ...omit(formData, ['key', 'autoGenerate']),
          },
        },
      })
    } else {
      const allData = form.getFieldsValue(true)
      await createEntry({
        variables: {
          key: formData.key,
          appId: allData.appId,
          langs: {
            ...omit(formData, ['key', 'autoGenerate']),
          },
        },
      })
    }
    onActionSuccess?.()
    message.success(`${initialFormData?.entryId ? '修改' : '新增'}词条成功！`)
    return true
  }

  return (
    <ProForm
      initialValues={{
        autoGenerate: true,
      }}
      form={form}
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}
      submitter={{
        searchConfig: { submitText: '编辑' },
      }}>
      <ProForm.Item shouldUpdate>
        {({ getFieldValue }) => {
          const entryId = getFieldValue('entryId')
          const appId = getFieldValue('appId')
          const autoGenerate = getFieldValue('autoGenerate')
          return (
            <ProFormText
              disabled={autoGenerate}
              name="key"
              label="词条key"
              tooltip="词条可读的描述，应用内唯一"
              placeholder="请输入词条key"
              validateTrigger="onBlur"
              rules={[
                {
                  validator: entryKeyValidator(appId, entryId),
                },
              ]}
              addonAfter={
                <ProFormCheckbox
                  disabled={initialFormData.key}
                  noStyle
                  name="autoGenerate">
                  自动生成
                </ProFormCheckbox>
              }
            />
          )
        }}
      </ProForm.Item>
      <ProForm.Group>
        {supportLanguageArray.map((lang, index) => {
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
              label={appSupportLangsTableEnum[lang]?.text}
              placeholder="请输入多语言词条"
            />
          )
        })}
      </ProForm.Group>
    </ProForm>
  )
}

export default EntryForm
