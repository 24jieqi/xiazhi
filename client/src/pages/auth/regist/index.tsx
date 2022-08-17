import {
  ProCard,
  ProForm,
  ProFormCaptcha,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  StepsForm,
} from '@ant-design/pro-components'
import React, { useState } from 'react'
import { Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserRoleEnum } from '@/graphql/generated/types'
import {
  useRegisterMutation,
  useUpdateUserInfoMutation,
} from '@/graphql/operations/__generated__/auth.generated'
import { getPictureUrlList } from '@/pages/application/add'

const roleValueEnums = {
  [UserRoleEnum.Developer]: '开发',
  [UserRoleEnum.Manager]: '项目管理',
  [UserRoleEnum.Translator]: '专职翻译',
  [UserRoleEnum.Other]: '其他',
}

interface RegistStepFormFields {
  email: string
  password: string
  password_again: string
}

interface RegistStepFormUserInfoFields {
  name: string
  nickName: string
  role: UserRoleEnum
  avatar: any
}

const RegistPage: React.FC = () => {
  const [registUser] = useRegisterMutation()
  const [token, setToken] = useState('')
  const [updateUserInfo] = useUpdateUserInfoMutation()
  const navigate = useNavigate()
  async function handleRegist({ email, password }: RegistStepFormFields) {
    try {
      const res = await registUser({
        variables: {
          email,
          password,
        },
      })
      setToken(res.data.register)
      message.success('注册成功！')
      return true
    } catch (error) {
      return false
    }
  }
  async function handleUpdateUserInfo({
    name,
    nickName,
    role,
    avatar,
  }: RegistStepFormUserInfoFields) {
    try {
      await updateUserInfo({
        variables: {
          name,
          nickName,
          role,
          avatar: getPictureUrlList(avatar)[0],
        },
        context: {
          headers: {
            Authorization: token,
          },
        },
      })
      navigate('/login')
      return true
    } catch (error) {
      return false
    }
  }
  return (
    <ProCard title="新用户注册">
      <StepsForm
        submitter={{
          render({ step, onSubmit }, dom) {
            if (step === 1) {
              return [
                <Button key="skip">以后再说</Button>,
                <Button
                  key="complete"
                  type="primary"
                  onClick={() => onSubmit?.()}>
                  完成
                </Button>,
              ]
            }
            return dom
          },
        }}>
        <StepsForm.StepForm<RegistStepFormFields>
          name="register"
          title="登录信息"
          onFinish={handleRegist}>
          <ProCard bordered style={{ marginBottom: 16 }}>
            <ProFormText
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请填写邮箱' },
                { type: 'email', message: '请填写正确邮箱' },
              ]}
            />
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
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm<RegistStepFormUserInfoFields>
          name="info"
          onFinish={handleUpdateUserInfo}
          title="用户信息">
          <ProCard bordered style={{ marginBottom: 16 }}>
            <ProFormText name="name" label="姓名" tooltip="推荐使用真实姓名" />
            <ProFormText name="nickName" label="昵称" />
            <ProFormSelect
              name="role"
              label="角色"
              valueEnum={roleValueEnums}
            />
            <ProFormUploadButton
              name="avatar"
              label="头像"
              max={2}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              action="/_files/upload"
            />
            {/* <ProFormText
              name="mobile"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              placeholder="请输入验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234')
              }}
            /> */}
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  )
}

export default RegistPage
