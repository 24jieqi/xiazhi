import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { flatten, omit } from 'lodash'
import { pinyin } from 'pinyin-pro'
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

const EntryModal: React.FC<EntryModalProps> = ({
  children,
  initialFormData,
  supportLanguageArray,
  onActionSuccess,
}) => {
  const formRef = useRef(null)
  const [form] = ProForm.useForm()
  const [isShow, setIsShow] = useState<boolean>(false)

  const [createEntry] = useCreateEntryMutation()
  const [updateEntry] = useUpdateEntryMutation()

  // 设置默认值
  useEffect(() => {
    if (typeof initialFormData !== 'undefined' && isShow && formRef.current) {
      form.setFieldsValue({ ...initialFormData })
    }
  }, [initialFormData, isShow, form])

  function handleValuesChange(changedValues: Record<string, any>, values) {
    const keys = Object.keys(changedValues)
    if (
      keys.includes(LanguageTypeEnum.zh) &&
      values.autoGenerate &&
      !initialFormData?.entryId
    ) {
      const pinYinArr = pinyin(changedValues[LanguageTypeEnum.zh])
      const pinYinStr = flatten(pinYinArr).join('_')
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
  }

  function handleVisibleChange(visible: boolean) {
    if (!visible) {
      form.resetFields()
    }
    setIsShow(visible)
  }

  const formateSupportLanguageArray = useMemo(() => {
    const tempArr = [...supportLanguageArray].filter(item =>
      langKeys.includes(item),
    )
    const index = tempArr.findIndex(item => item === LanguageTypeEnum.zh)
    tempArr.splice(index, 1)
    tempArr.unshift(LanguageTypeEnum.zh)
    return tempArr
  }, [supportLanguageArray])

  return (
    <ModalForm
      form={form}
      formRef={formRef}
      onValuesChange={handleValuesChange}
      onVisibleChange={handleVisibleChange}
      visible={isShow}
      initialValues={{ autoGenerate: true }}
      modalProps={{
        maskClosable: false,
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
      onFinish={handleFinish}>
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
        {formateSupportLanguageArray.map((lang, index) => {
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
