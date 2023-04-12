import { Alert, Form, message, Modal, Select } from 'antd'
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { appSupportLangsTableEnum } from '@/pages/application/constant'
import { useGetTransformAppInfoByIdLazyQuery } from '@/graphql/operations/__generated__/app.generated'
import {
  useTransformEntryMutation,
  useValidEntryKeyLazyQuery,
} from '@/graphql/operations/__generated__/entry.generated'

interface ParamsType {
  entryId: number
  currentAppId?: number
  langObj: any
  key: string
}

export interface TransformEntryModalRefProps {
  open: (params: ParamsType) => void
}

interface TransformEntryModalProps {
  onResetCurrent?: () => void
  onActionSuccess?: () => void
}

const TransformEntryModal: React.ForwardRefRenderFunction<
  TransformEntryModalRefProps,
  TransformEntryModalProps
> = ({ onResetCurrent, onActionSuccess }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState<ParamsType>(null)

  const [getTransformAppInfo, { data: transformAppInfo }] =
    useGetTransformAppInfoByIdLazyQuery()
  const [validEntryKey] = useValidEntryKeyLazyQuery()
  const [transformEntry, { loading }] = useTransformEntryMutation()

  useImperativeHandle(ref, () => ({
    open: params => {
      getTransformAppInfo({
        variables: {
          entryId: params.entryId,
        },
      })
      setData(params)
      setVisible(true)
    },
  }))

  async function handleOk() {
    const formData = await form.validateFields()
    const res = await validEntryKey({
      variables: {
        appId: formData.targetAppId === -1 ? undefined : formData.targetAppId,
        entryId: data.entryId,
        key: data.key,
      },
    })
    if (res.data.validEntryKey) {
      await transformEntry({
        variables: {
          entryId: data.entryId,
          targetAppId: formData.targetAppId,
        },
      })
      message.success('转换成功')
      onActionSuccess?.()
      handleCancel()
    } else {
      message.error(`当前词条key：${data.key}在目标词库重复,请修改后重试`)
    }
  }

  function handleCancel() {
    onResetCurrent?.()
    form.resetFields()
    setVisible(false)
  }

  const langInfo = useMemo(() => {
    const langArray = []
    if (data) {
      const { langObj } = data
      Object.keys(langObj).forEach(lang => {
        if (appSupportLangsTableEnum[lang]) {
          langArray.push({
            label: appSupportLangsTableEnum[lang].text,
            value: langObj[lang],
          })
        }
      })
    }
    return langArray.filter(lang => lang.value)
  }, [data])

  const options = useMemo(() => {
    let arr = transformAppInfo?.getTransformAppInfoById || []
    if (data?.currentAppId) {
      arr = [].concat(
        [
          {
            label: '公共词库',
            value: -1,
          },
        ],
        arr,
      )
    }
    return arr
  }, [transformAppInfo, data])

  return (
    <Modal
      title="词条转换"
      visible={visible}
      destroyOnClose
      maskClosable={false}
      confirmLoading={loading}
      forceRender
      onOk={handleOk}
      onCancel={handleCancel}>
      <Alert
        style={{ marginBottom: 24 }}
        message={
          <div>
            <span style={{ color: 'red' }}>当前词条</span>
            {langInfo.map(lang => (
              <div key={lang.value}>
                {lang.label}：{lang.value}
              </div>
            ))}
          </div>
        }
        type="info"
      />
      <Form form={form} layout="vertical">
        <Form.Item
          label="转换目标"
          name="targetAppId"
          preserve={false}
          rules={[{ required: true, message: '请选择转换目标' }]}>
          <Select placeholder="请选择转换目标" options={options as []} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default forwardRef(TransformEntryModal)
