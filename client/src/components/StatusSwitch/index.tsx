import { Popconfirm, Switch } from 'antd'
import React, { useEffect, useState } from 'react'

interface IProps {
  onConfirm: (callback?: () => void, checked?: boolean) => void
  checked: boolean
  disable?: boolean
  checkedChildren?: string
  unCheckedChildren?: string
}

/**
 * 受控的switch组件，修改状态需要二次确认
 * @param param0
 */
const StatusSwitch: React.FC<IProps> = ({
  checked,
  onConfirm,
  disable,
  checkedChildren = '启用',
  unCheckedChildren = '禁用',
}) => {
  const [visible, setVisible] = useState(checked)
  useEffect(() => {
    setVisible(checked)
  }, [checked])
  function handleConfirm() {
    onConfirm(() => setVisible(!visible), visible)
  }
  return (
    <Popconfirm
      disabled={disable}
      title={`是否${visible ? unCheckedChildren : checkedChildren}`}
      okText={visible ? unCheckedChildren : checkedChildren}
      cancelText="取消"
      onConfirm={handleConfirm}>
      <Switch
        disabled={disable}
        checked={visible}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    </Popconfirm>
  )
}

export default StatusSwitch
