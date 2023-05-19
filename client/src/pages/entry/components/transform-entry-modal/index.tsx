import { Alert, message, Modal } from 'antd'
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { appSupportLangsTableEnum } from '@/pages/application/constant'
import {
  useQueryPublicEntryByMainTextLazyQuery,
  useTransformEntryMutation,
  useValidEntryKeyLazyQuery,
} from '@/graphql/operations/__generated__/entry.generated'

interface ParamsType {
  entryId: number
  currentAppId?: number
  langObj: any
  key: string
  mainLangText: string
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
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState<ParamsType>(null)
  const [queryPublicEntry, { data: publicEntry }] =
    useQueryPublicEntryByMainTextLazyQuery()

  const [validEntryKey] = useValidEntryKeyLazyQuery()
  const [transformEntry, { loading }] = useTransformEntryMutation()

  useImperativeHandle(ref, () => ({
    open: params => {
      setData(params)
      queryPublicEntry({
        variables: {
          mainText: params.mainLangText,
        },
      })
      setVisible(true)
    },
  }))

  async function handleOk() {
    const res = await validEntryKey({
      variables: {
        appId: data.currentAppId,
        entryId: data.entryId,
        key: data.key,
      },
    })
    if (res.data.validEntryKey) {
      await transformEntry({
        variables: {
          entryId: data.entryId,
          targetAppId: data.currentAppId,
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
    </Modal>
  )
}

export default forwardRef(TransformEntryModal)
