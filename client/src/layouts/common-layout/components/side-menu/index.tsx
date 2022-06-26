import React, { memo, createElement } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { MenuProps } from 'antd/lib/menu'
import * as Icons from '@ant-design/icons'
import { CustomRouteConfig } from '@/router/config'
import { useI18n } from '@/i18n/context'
import styles from './style.module.less'
interface IProps extends MenuProps {
  menuList: CustomRouteConfig[]
}

const SideMenu: React.FC<IProps> = ({ menuList, ...restProps }) => {
  const { I18N } = useI18n()
  const renderMenu = (menuConfig: CustomRouteConfig[]) => {
    return menuConfig?.map(menu => {
      const menuText = I18N.menu[menu.meta?.title]
      const key = menu.meta?.title
      const subRoutes = menu.children
      // eslint-disable-next-line import/namespace
      const icon = menu?.meta?.icon
        ? // eslint-disable-next-line import/namespace
          createElement(Icons[menu.meta.icon])
        : null
      if (subRoutes?.length > 0) {
        return (
          <Menu.SubMenu
            icon={icon}
            title={I18N.menu[menu.meta?.title]}
            key={key}>
            {renderMenu(subRoutes)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={key} icon={icon}>
          <Link to={Array.isArray(menu.path) ? menu.path[0] : menu.path}>
            {menuText}
          </Link>
        </Menu.Item>
      )
    })
  }
  return (
    <Menu theme="dark" mode="inline" {...restProps} className={styles.sideMenu}>
      {renderMenu(menuList)}
    </Menu>
  )
}

export default memo(SideMenu)
