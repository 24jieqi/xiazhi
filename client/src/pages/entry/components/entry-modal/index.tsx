import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useRef } from 'react'
import { LangageTypeOption, LanguageTypeEnum } from '@/graphql/generated/types'
import { useListSupportLanguageQuery } from '@/graphql/operations/__generated__/basic.generated'
import { useCreateEntryMutation } from '@/graphql/operations/__generated__/entry.generated'

interface EntryModalProps {
  children?: JSX.Element
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

const EntryModal: React.FC<EntryModalProps> = ({ children }) => {
  const { data } = useListSupportLanguageQuery()
  const [createEntry] = useCreateEntryMutation()
  const langs = groupLangs(data?.listSupportLanguage)
  const form = useRef<ProFormInstance>()
  return (
    <ModalForm
      formRef={form}
      trigger={
        children || (
          <Button type="primary">
            <PlusOutlined />
            新增词条
          </Button>
        )
      }
      onFinish={async formData => {
        await createEntry({
          variables: {
            key: formData.key,
            langs: {
              ...omit(formData, ['key']),
            },
          },
        })
        return true
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}>
      <ProFormText
        width="md"
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
                  width="md"
                  name={item.value}
                  label={item.label}
                  placeholder="请输入多语言词条"
                />
              )
            })}
          </ProForm.Group>
        )
      })}
    </ModalForm>
  )
}

export default EntryModal
