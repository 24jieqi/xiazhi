import { message, Switch } from 'antd'
import React, { useState } from 'react'
import { useChangeAccessStatusMutation } from '@/graphql/operations/__generated__/app.generated'

interface AccessSwitchProps {
  appId: number
  type: 'access' | 'push'
  disabled?: boolean
  initialChecked?: boolean
  onChangeSuccess?: () => void
}

const AccessSwitch: React.FC<AccessSwitchProps> = ({
  initialChecked = false,
  disabled = false,
  onChangeSuccess,
  appId,
  type,
}) => {
  const [changeAccessStatus, { loading }] = useChangeAccessStatusMutation()
  const [checked, setChecked] = useState(initialChecked)
  async function handleChangeCheckedStatus(nextChecked: boolean) {
    await changeAccessStatus({
      variables: {
        appId,
        [type]: nextChecked,
      },
    })
    setChecked(nextChecked)
    message.success(`${nextChecked ? '启用' : '禁用'}成功！`)
    onChangeSuccess?.()
  }
  return (
    <Switch
      disabled={disabled}
      loading={loading}
      checked={checked}
      onChange={handleChangeCheckedStatus}
    />
  )
}

export default AccessSwitch
