import { GlobalOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React, { memo } from 'react'

import { IconBox } from '@/chunfen'
import { useI18n } from '@/i18n/context'

interface IProps {}

const Lang: React.FC<IProps> = () => {
  const { setLangTriggerRender, I18N } = useI18n()

  const langsChange = ({ key }) => {
    setLangTriggerRender(key)
  }

  return (
    <Dropdown
      menu={{
        onClick: langsChange,
        items: I18N.langs.map(v => ({
          key: v.value,
          label: v.label,
        })),
      }}
      trigger={['click']}>
      <IconBox>
        <GlobalOutlined />
      </IconBox>
    </Dropdown>
  )
}

export default memo(Lang)
