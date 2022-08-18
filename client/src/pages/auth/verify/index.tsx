import { ProCard } from '@ant-design/pro-components'
import { Button, Result, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useVerifyEmailMutation } from '@/graphql/operations/__generated__/auth.generated'
import usePermissions from '@/stores/permissions'

const EmailVerifyPage: React.FC = () => {
  const [verifyEmail, { data }] = useVerifyEmailMutation()
  const [success, setSuccess] = useState(false)
  const { setToken } = usePermissions()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('t')
  useEffect(() => {
    if (!token) {
      return
    }
    verifyEmail({
      context: {
        headers: {
          Authorization: token,
        },
      },
    }).then(() => {
      setSuccess(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  function handleQuickLogin() {
    setToken(data.verifyEmail)
    navigate('/home')
  }
  return (
    <ProCard title="邮箱验证">
      <ProCard bordered>
        {success ? (
          <Result
            status="success"
            title="完成"
            subTitle="邮箱验证完成，1s后将自动登录"
            extra={[
              <Button type="primary" key="start" onClick={handleQuickLogin}>
                开始使用
              </Button>,
            ]}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={true} tip="验证中..." />
          </div>
        )}
      </ProCard>
    </ProCard>
  )
}

export default EmailVerifyPage
