import React from 'react'

import { PageContainer } from '@/chunfen/admin-layout'
import type { PageContainerProps } from '@/chunfen/interface'

import styles from './style.module.less'

export interface ContainerLayoutProps extends PageContainerProps {
  /**
   * 是否可滚动（默认为false）
   */
  scrollable?: boolean
}

/**
 * chunfen 页面布局容器（提供面包屑导航）
 * @param param0
 * @returns
 */
const Container: React.FC<ContainerLayoutProps> = ({
  scrollable = false,
  ...props
}) => {
  return (
    <PageContainer
      {...props}
      className={scrollable ? null : styles.container}
    />
  )
}

export default Container
