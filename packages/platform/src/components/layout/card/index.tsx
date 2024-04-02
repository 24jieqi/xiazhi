import { Skeleton } from 'antd'
import type { PropsWithChildren } from 'react'
import React from 'react'

import styles from './style.module.less'

interface CardLayoutProps {
  style?: React.CSSProperties
  loading?: boolean
  testId?: string
}

/**
 * 列表页卡片布局（一般用作表格筛选条件容器）
 * @param param0
 * @returns
 */
const CardLayout: React.FC<PropsWithChildren<CardLayoutProps>> = ({
  children,
  style = {},
  loading = false,
  testId,
}) => {
  return (
    <div className={styles.card} style={style} data-testid={testId}>
      <Skeleton loading={loading}>{children}</Skeleton>
    </div>
  )
}

export default CardLayout
