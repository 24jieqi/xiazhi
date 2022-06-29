/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginFormPage, ProFormText } from '@ant-design/pro-components'
import { Button } from 'antd'
import React from 'react'
import { useLoginMutation } from '@/graphql/operations/__generated__/auth.generated'
import usePermissions from '@/stores/permissions'

const Login: React.FC = () => {
  const [login] = useLoginMutation()
  const { setToken } = usePermissions()
  async function handleLogin(formData) {
    const res = await login({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    })
    const token = res.data.login
    setToken(token)
    return true
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: 'calc(100vh - 48px)',
      }}>
      <LoginFormPage
        onFinish={handleLogin}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="夏至"
        subTitle="多语言词库平台"
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: '#fff',
            borderRadius: 8,
            backgroundColor: '#1677FF',
          },
          title: 'ext-intl',
          subTitle: '配套的多语言脚本工具',
          action: (
            <Button
              type="primary"
              onClick={() => {
                window.open('https://www.npmjs.com/package/ext-intl', '_blank')
              }}>
              查看
            </Button>
          ),
        }}>
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className="prefixIcon" />,
          }}
          placeholder="邮箱"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginFormPage>
    </div>
  )
}

export default Login
