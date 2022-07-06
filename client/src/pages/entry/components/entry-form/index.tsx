import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import React, { useEffect, useRef } from 'react'
import {
  LangageTypeOption,
  LanguageTypeEnum,
  RecordItem,
} from '@/graphql/generated/types'
import { useListSupportLanguageQuery } from '@/graphql/operations/__generated__/basic.generated'
import {
  useCreateEntryMutation,
  useUpdateEntryMutation,
} from '@/graphql/operations/__generated__/entry.generated'

interface EntryFormProps {
  children?: JSX.Element
  initialFormData?: any
  /**
   * 当编辑/新增词条成功时触发
   */
  onActionSuccess?: () => void
}

function groupLangs(langs: LangageTypeOption[]) {
  if (!langs || !langs.length) {
    return []
  }
  const result: LangageTypeOption[][] = []
  for (let i = 0; i < langs.length; i += 2) {
    result[i] = [langs[i], langs[i + 1]]
  }
  return result
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
  onActionSuccess,
}) => {
  const { data } = useListSupportLanguageQuery()
  const [createEntry, { loading }] = useCreateEntryMutation()
  const [updateEntry] = useUpdateEntryMutation()
  const langs = groupLangs(data?.listSupportLanguage)
  const [form] = ProForm.useForm()
  const isAddActionRef = useRef(false)
  // 设置默认值
  useEffect(() => {
    if (typeof initialFormData !== 'undefined') {
      // 先重置再设置，否则可能出现数据混乱的问题
      form.resetFields()
      form.setFieldsValue({ ...initialFormData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFormData])
  async function handleAddEntry() {
    const res = await form.validateFields()
    isAddActionRef.current = true
    await createEntry({
      variables: {
        key: res.key,
        appId: initialFormData.appId,
        langs: {
          ...omit(res, ['key']),
        },
      },
    })
    isAddActionRef.current = false
    onActionSuccess?.()
    message.success('新增词条成功！')
  }
  return (
    <ProForm
      form={form}
      onFinish={async formData => {
        // 此时代表编辑
        if (initialFormData?.entryId) {
          await updateEntry({
            variables: {
              entryId: initialFormData.entryId,
              key: formData.key,
              langs: {
                ...omit(formData, ['key']),
              },
            },
          })
          onActionSuccess?.()
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
          onActionSuccess?.()
          message.success('新增词条成功！')
        }
        return true
      }}
      submitter={{
        searchConfig: { submitText: '编辑' },
        render: (_, doms) => {
          return [
            ...doms,
            <Button
              loading={isAddActionRef.current && loading}
              key="add"
              type="primary"
              onClick={handleAddEntry}>
              新增
            </Button>,
          ]
        },
      }}>
      <ProFormText
        name="key"
        label="词条key"
        tooltip="词条可读的描述，应用内唯一"
        placeholder="请输入词条key"
        // addonAfter={
        //   <Tooltip title="随机生成一个">
        //     <RedoOutlined />
        //   </Tooltip>
        // }
      />
      {langs.map((lang, index) => {
        return (
          <ProForm.Group key={index}>
            {lang.map(item => {
              const isRequired = item.value === LanguageTypeEnum.Chinese
              return (
                <ProFormText
                  rules={
                    isRequired
                      ? [{ required: true, message: '请输入中文词条' }]
                      : []
                  }
                  key={item.value}
                  name={item.value}
                  label={item.label}
                  placeholder="请输入多语言词条"
                />
              )
            })}
          </ProForm.Group>
        )
      })}
    </ProForm>
  )
}

export default EntryForm
