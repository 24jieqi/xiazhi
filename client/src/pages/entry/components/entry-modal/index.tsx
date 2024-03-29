import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { omit } from 'lodash'
import { pinyin } from 'pinyin-pro'
import { isDef } from '@fruits-chain/utils'
import {
  useCreateEntryMutation,
  useUpdateEntryMutation,
} from '@/graphql/operations/__generated__/entry.generated'
import {
  LangMapKeyType,
  LanguageTypeEnum,
  appSupportLangsOptions,
  appSupportLangsTableEnum,
  langKeys,
} from '@/pages/application/constant'
import { entryKeyValidator } from '../validator'
import { generateEntryKey } from '../utils'

interface EntryModalProps {
  children?: JSX.Element
  initialFormData?: any
  onActionSuccess?: () => void
  supportedLangs?: any[]
}

/**
 * 获取初始化选中的多语言
 * @param supportedLangs
 * @param formData
 */
function getInitialLangs(
  supportedLangs?: LangMapKeyType[],
  formData: Record<string, unknown> = {},
): LangMapKeyType[] {
  // 对于私有词条的编辑，传入了支持的多语言 直接使用
  if (isDef(supportedLangs)) {
    return supportedLangs
  }
  // 处理传入的初始化参数，并过滤出多语言的key
  const keys = Object.keys(formData).filter(key => langKeys.includes(key))
  // 如果包含key，则表示是编辑
  if (keys.length) {
    return keys as LangMapKeyType[]
  }
  // 新增的情况下默认显示中文和英文
  return ['zh', 'en']
}

function sortLangKeys(keys: LangMapKeyType[]) {
  const result = [...keys]
  const index = result.findIndex(key => key === 'zh')
  result.splice(index, 1)
  result.unshift('zh')
  return result
}

const EntryModal: React.FC<EntryModalProps> = ({
  children,
  initialFormData,
  onActionSuccess,
  supportedLangs,
}) => {
  const formRef = useRef(null)
  const [form] = ProForm.useForm()
  const [isShow, setIsShow] = useState<boolean>(false)

  const [createEntry] = useCreateEntryMutation()
  const [updateEntry] = useUpdateEntryMutation()
  // 设置默认值
  useEffect(() => {
    if (typeof initialFormData !== 'undefined' && isShow && formRef.current) {
      form.setFieldsValue({
        ...initialFormData,
      })
    }
  }, [initialFormData, isShow, form, supportedLangs])
  useEffect(() => {
    if (!isShow) {
      return
    }
    form.setFieldsValue({
      langs: sortLangKeys(getInitialLangs(supportedLangs, initialFormData)),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportedLangs, initialFormData, isShow])
  function handleValuesChange(changedValues: Record<string, any>, values) {
    const keys = Object.keys(changedValues)
    if (
      keys.includes(LanguageTypeEnum.zh) &&
      values.autoGenerate &&
      !initialFormData?.entryId
    ) {
      const pinYinStr = pinyin(changedValues[LanguageTypeEnum.zh], {
        toneType: 'none',
      })
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
            ...omit(formData, ['key', 'langs']),
          },
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
            ...omit(formData, ['key', 'langs']),
          },
        },
      })
      message.success('新增词条成功！')
    }
    onActionSuccess?.()
    return true
  }

  function handleVisibleChange(visible: boolean) {
    setIsShow(visible)
  }
  const langOptions = useMemo(() => {
    if (isDef(supportedLangs)) {
      return appSupportLangsOptions.filter(option =>
        supportedLangs.includes(option.value),
      )
    }
    return appSupportLangsOptions
  }, [supportedLangs])
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
      <ProFormSelect
        width="md"
        disabled={isDef(supportedLangs)}
        mode="multiple"
        showSearch
        name="langs"
        placeholder="请选择支持的语言"
        label="多语言"
        options={langOptions}
      />
      <ProForm.Item dependencies={['langs']}>
        {({ getFieldValue }) => {
          const langs: string[] = getFieldValue('langs') || []
          return (
            <ProForm.Group>
              {langs.map((lang, index) => {
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
          )
        }}
      </ProForm.Item>
    </ModalForm>
  )
}

export default EntryModal
