/* eslint-disable react/no-unstable-nested-components */
import { UserOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Avatar } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import defaultProps from './menuConfig'

const settings = {
  fixSiderbar: true,
  // navTheme: 'light',
  // layout: 'mix',
  // contentWidth: 'Fluid',
  headerHeight: 48,
  primaryColor: '#13C2C2',
  splitMenus: false,
  fixedHeader: true,
}

const CommonLayout: React.FC = () => {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)
  return (
    <div
      style={{
        height: '100vh',
      }}>
      <ProLayout
        {...defaultProps}
        navTheme="light"
        layout="mix"
        contentWidth="Fluid"
        location={{
          pathname,
        }}
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
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        title="多语言词库平台"
        {...settings}>
        <Outlet />
      </ProLayout>
    </div>
  )
}

export default CommonLayout
