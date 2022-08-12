/* eslint-disable react/no-unstable-nested-components */
import { UserOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Avatar, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useUser from '@/stores/user'
import FeedbackModal from './Feedback'
import defaultProps from './menuConfig'
import UserCard from './UserCard'
import styles from './style.module.less'

const settings = {
  fixSiderbar: true,
  headerHeight: 48,
  primaryColor: '#13C2C2',
  splitMenus: false,
  fixedHeader: true,
}

const CommonLayout: React.FC = () => {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)
  const { fetchUser } = useUser()
  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      style={{
        height: '100vh',
      }}>
      <ProLayout
        {...defaultProps}
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
