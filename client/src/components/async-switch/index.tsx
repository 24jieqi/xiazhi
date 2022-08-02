import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'

interface AsyncSwitchProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => Promise<boolean>
}

/**
 * 非受控的异步开关
 * @param param0
 * @returns
 */
const AsyncSwitch: React.FC<AsyncSwitchProps> = ({
  defaultChecked,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  // 设置是否同步过一次
  const [isSync, setIsSync] = useState(false)
  async function handleStatusChange(curr: boolean) {
    if (!onChange) {
      setChecked(curr)
      return
    }
    try {
      const nextStatus = await onChange(curr)
      setChecked(nextStatus)
    } catch (error) {}
  }
  // 只能同步一次有值的情况
  useEffect(() => {
    if (isSync) {
      return
    }
    if (typeof defaultChecked !== 'undefined') {
      setChecked(defaultChecked)
      setIsSync(true)
    }
  }, [defaultChecked, isSync])
  return <Switch onChange={handleStatusChange} checked={checked} />
}

export default AsyncSwitch
