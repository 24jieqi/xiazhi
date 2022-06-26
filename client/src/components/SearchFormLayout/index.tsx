import { Col, Row } from 'antd'
import React from 'react'
import { listSearchFromItemProps } from '@/config/defaultSettings'
interface IProps {
  list?: any[]
}
const Index: React.FC<IProps> = ({ list }) => {
  return (
    <Row {...listSearchFromItemProps.rowProps}>
      {list?.map((v, i) => {
        return (
          <Col {...listSearchFromItemProps.colProps} key={i}>
            {v}
          </Col>
        )
      })}
    </Row>
  )
}

export default Index
