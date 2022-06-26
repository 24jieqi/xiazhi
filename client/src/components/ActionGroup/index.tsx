import React, { FC } from 'react'
import { Button, ButtonProps, Space, Divider } from 'antd'

interface ButtonConfig extends ButtonProps {
  show?: boolean | (() => boolean)
  render?: (ButtonNode: React.ReactNode) => React.ReactNode
}

interface IProps {
  divider?: boolean
  actions: ButtonConfig[]
}

const ActionGroup: FC<IProps> = ({ divider = true, actions }) => {
  const visibleActions = actions.filter(({ show = true }) => {
    return typeof show === 'function' ? show() : show
  })
  const visibleActionsLength = visibleActions.length - 1
  return (
    <Space size={divider ? 0 : 17}>
      {visibleActions.map((item, index) => {
        const notLast = index < visibleActionsLength
        const { type = 'link', style, render, children, ...restProps } = item
        delete restProps.show
        const btnNode = (
          <Button
            size="small"
            type={type}
            style={{ padding: 0, ...style }}
            {...restProps}>
            {children}
          </Button>
        )
        return (
          <React.Fragment key={index}>
            {render ? render(btnNode) : btnNode}
            {divider && notLast && <Divider type="vertical" />}
          </React.Fragment>
        )
      })}
    </Space>
  )
}

export default ActionGroup
