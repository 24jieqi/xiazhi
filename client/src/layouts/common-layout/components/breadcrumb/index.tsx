import React, { FC } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { CustomRouteConfig } from '@/router/config/index'
import { useI18n } from '@/i18n/context'
import styles from './index.module.less'

export interface BreadcrumbItem {
  name: string
  path?: string
}
interface IProps {
  route: CustomRouteConfig
}

const AppBreadcrumb: FC<IProps> = ({ route }) => {
  const { I18N } = useI18n()
  const breadcrumb = route?.breadcrumb || []
  if (breadcrumb.length === 0) {
    return null
  }
  return (
    <Breadcrumb className={styles.wrap}>
      {breadcrumb?.map((v, i) => {
        const name = I18N.menu[v.name] ?? v.name
        return v?.path ? (
          <Breadcrumb.Item key={i}>
            <Link to={v?.path}>{name}</Link>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={i}>{name}</Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default AppBreadcrumb
