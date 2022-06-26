import React from 'react'
import { GlobalOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { useI18n } from '@/i18n/context'
import styles from '../../index.module.less'
interface IProps {}
const Lang: React.FC<IProps> = () => {
  const { setLangTriggerRender } = useI18n()
  const langs = [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
    { label: 'ภาษาไทย', value: 'th-TH' },
    { label: 'ViệtName', value: 'vi-VN' },
  ]
  const langsChange = ({ key }) => {
    setLangTriggerRender(key)
  }
  const menu = (
    <Menu onClick={langsChange}>
      {langs.map(v => {
        return <Menu.Item key={v.value}>{v.label}</Menu.Item>
      })}
    </Menu>
  )
  return (
    <div className={styles.box}>
      <Dropdown overlay={menu} trigger={['click']}>
        <GlobalOutlined />
      </Dropdown>
    </div>
  )
}

export default Lang
