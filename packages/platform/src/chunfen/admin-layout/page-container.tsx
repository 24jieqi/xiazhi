import React, { memo } from 'react'

import type { PageContainerProps } from '../interface'

import Breadcrumb from './breadcrumb'
import Container from './container'

const PageContainer: React.FC<PageContainerProps> = ({ items, ...props }) => {
  return (
    <>
      <Breadcrumb items={items} />
      <Container {...props} />
    </>
  )
}

export default memo(PageContainer)
