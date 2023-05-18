/* eslint-disable react/no-unstable-nested-components */
import { UserOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Alert, Avatar, Button, notification, Popover, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useUser from '@/stores/user'
import FeedbackModal from './Feedback'
import defaultProps from './menuConfig'
import UserCard from './UserCard'
import styles from './style.module.less'
import { useSendVerifyEmailMutation } from '@/graphql/operations/__generated__/auth.generated'

const settings = {
  fixSiderbar: true,
  headerHeight: 48,
  primaryColor: '#13C2C2',
  splitMenus: false,
  fixedHeader: true,
}

const notificationKey = 'verify-email-key'

const CommonLayout: React.FC = () => {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)
  const { fetchUser, info } = useUser()
  const [sendVerifyEmail, { loading }] = useSendVerifyEmailMutation()
  async function handleSendVerifyEmail() {
    notification.info({
      key: notificationKey,
      message: '邮件发送中...',
      description: (
        <div style={{ textAlign: 'center' }}>
          <Spin spinning />
        </div>
      ),
    })
    await sendVerifyEmail()
    notification.success({
      key: notificationKey,
      message: '邮件发送成功',
      description: '请检查你的邮箱，并按步骤完成激活',
    })
    setTimeout(() => {
      notification.close(notificationKey)
    }, 1000)
  }
  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (info?.user_id && !info.verifyType) {
      notification.warn({
        message: '邮箱激活',
        key: notificationKey,
        description: (
          <>
            <p>
              检测到你尚未激活邮件，为了保证功能的正常使用，请尽快检查邮件并完成激活。
            </p>
            <Button
              onClick={handleSendVerifyEmail}
              type="link"
              loading={loading}
              style={{ paddingLeft: 0, paddingRight: 0 }}>
              发送邮件
            </Button>
          </>
        ),
        duration: 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
  return (
    <div
      style={{
        height: '100vh',
      }}>
      <ProLayout
        {...defaultProps}
        logo={false}
        navTheme="light"
        breakpoint={false}
        layout="mix"
        contentWidth="Fluid"
        location={{
          pathname,
        }}
        defaultCollapsed={true}
        menuItemRender={(item, dom) => (
          <Link
            to={item.path}
            onClick={() => {
              setPathname(item.path)
            }}>
            {dom}
          </Link>
        )}
        rightContentRender={() => (
          <div>
            <Popover
              overlayClassName={styles.userCard}
              trigger="hover"
              content={<UserCard />}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Popover>
          </div>
        )}
        menuFooterRender={() => <FeedbackModal />}
        title="多语言词库平台"
        {...settings}>
        <Outlet />
      </ProLayout>
    </div>
  )
}

export default CommonLayout
