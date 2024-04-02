import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Layout } from 'antd'
import isNil from 'lodash/isNil'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import type { AdminLayoutProps } from '../../interface'
import { useAdminRouteContext } from '../admin-router-context'
import IconBox from '../icon-box'

import './style.less'

const Header: React.FC<
  Pick<
    AdminLayoutProps,
    | 'logo'
    | 'title'
    | 'headerRight'
    | 'titleLink'
    | 'showCollapse'
    | 'headerLeftExtra'
  >
> = ({
  logo,
  title,
  titleLink,
  headerRight,
  showCollapse,
  headerLeftExtra,
}) => {
  const { collapsed, toggleCollapsed } = useAdminRouteContext()
  const onClickCollapseIcon = useMemoizedFn(() => {
    toggleCollapsed()
  })

  const CollapseIcon = collapsed ? MenuFoldOutlined : MenuUnfoldOutlined

  return (
    <Layout.Header className="chunfen-header">
      <div className="chunfen-header-left">
        {!isNil(titleLink) ? (
          <Link to={titleLink} className="chunfen-header-logo">
            <Fragment key="logo">{logo}</Fragment>
            <Fragment key="title">{title}</Fragment>
          </Link>
        ) : (
          <span className="chunfen-header-logo" key="normal-header-wrapper">
            <Fragment key="logo">{logo}</Fragment>
            <Fragment key="title">{title}</Fragment>
          </span>
        )}
        {showCollapse ? (
          <IconBox
            className="chunfen-header-collapse"
            onClick={onClickCollapseIcon}>
            <CollapseIcon />
          </IconBox>
        ) : null}
        {headerLeftExtra ? (
          <div className="chunfen-header-left-extra">{headerLeftExtra}</div>
        ) : null}
      </div>

      <div className="chunfen-header-right">{headerRight}</div>
    </Layout.Header>
  )
}

export default Header
