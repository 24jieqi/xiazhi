import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import React from 'react'
import styles from './index.module.less'

type BaseCardInterface = CardProps
const BaseCard: React.FC<BaseCardInterface> = ({ children, ...props }) => {
  return (
    <Card bordered={false} className={styles.card} {...props}>
      {children}
    </Card>
  )
}

export default BaseCard
