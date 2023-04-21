import { EditOutlined } from '@ant-design/icons'
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components'
import { message } from 'antd'
import React from 'react'
import { useFeedbackMutation } from '@/graphql/operations/__generated__/feedback.generated'

const FeedbackModal: React.FC = () => {
  const [feedback] = useFeedbackMutation()
  return (
    <ModalForm<{ message: string }>
      autoFocusFirstInput
      title="使用反馈"
      width={480}
      modalProps={{
        centered: true,
        maskClosable: false,
      }}
      onFinish={async (formData: { message: any }) => {
        await feedback({
          variables: {
            result: false,
            message: formData.message,
          },
        })
        message.success('反馈成功！')
        return true
      }}
      trigger={
        <div
          style={{
            width: 48,
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
          <EditOutlined />
        </div>
      }>
      <ProFormTextArea
        name="message"
        label="反馈信息"
        placeholder="请输入您的反馈信息"
      />
    </ModalForm>
  )
}

export default FeedbackModal
