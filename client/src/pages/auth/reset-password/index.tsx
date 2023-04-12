import {
  ProCard,
  ProForm,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  useResetPasswordMutation,
  useSendResetPasswordEmailMutation,
} from '@/graphql/operations/__generated__/auth.generated'

interface EmailStepFormFields {
  email: string
}

interface PasswordStepFormFields {
  password: string
  password_again: string
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('t')
  const [current, setCurrent] = useState(token ? 1 : 0)

  const [sendResetPasswordEmail, { loading }] =
    useSendResetPasswordEmailMutation()
  const [resetPassword] = useResetPasswordMutation()

  async function handleSendResetPasswordEmail(formData: EmailStepFormFields) {
    await sendResetPasswordEmail({
      variables: {
        email: formData.email,
      },
    })
    message.success('邮件发送成功！')
    return true
  }

  async function handleResetPassword(formData: PasswordStepFormFields) {
    await resetPassword({
      variables: {
        password: formData.password,
      },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
    message.success('密码修改成功！')
    navigate('/login')
    return true
  }

  return (
    <ProCard title="重设密码">
      <StepsForm
        current={current}
        onCurrentChange={curr => setCurrent(curr)}
        submitter={{
          render({ step, onSubmit }, dom) {
            if (step === 0) {
              return (
                <Button
                  loading={loading}
                  onClick={() => onSubmit?.()}
                  type="primary">
                  发送邮件
                </Button>
              )
            }
            if (step === 1) {
              return (
                <Button type="primary" onClick={() => onSubmit?.()}>
                  重设密码
                </Button>
              )
            }
            return dom
          },
        }}>
        <StepsForm.StepForm<EmailStepFormFields>
          name="email"
          title="验证邮箱"
          onFinish={handleSendResetPasswordEmail}>
          <ProFormText
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请填写邮箱' },
              { type: 'email', message: '请填写正确邮箱' },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<PasswordStepFormFields>
          name="password"
          title="设置密码"
          onFinish={handleResetPassword}>
          <ProFormText.Password
            rules={[
              {
                required: true,
                type: 'string',
                min: 6,
                max: 20,
                message: '密码长度为6-20位',
              },
            ]}
            name="password"
            label="密码"
          />
          <ProForm.Item dependencies={['password']}>
            {({ getFieldValue }) => {
              const password = getFieldValue('password')
              return (
                <ProFormText.Password
                  name="password_again"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      min: 6,
                      max: 20,
                      message: '密码长度为6-20位',
                    },
                    {
                      validator(_, value) {
                        if (value && value !== password) {
                          return Promise.reject(new Error('密码输入不一致！'))
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                  label="确认密码"
                />
              )
            }}
          </ProForm.Item>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  )
}

export default ResetPasswordPage
