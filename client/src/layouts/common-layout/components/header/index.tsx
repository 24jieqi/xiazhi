/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import header_logo from '@/images/header_logo.png'
import useCommonLayout from '../../useCommonLayout'
import styles from './index.module.less'
import Download from './components/download'
import Lang from './components/lang'
import Explain from './components/explain'
import UserInfo from './components/user-info'

const AppHeader: FC = () => {
  const { menuShown, toggleMenuShown } = useCommonLayout()
  const CollapseIcon = menuShown ? MenuFoldOutlined : MenuUnfoldOutlined
  function handleToggleMenuShown() {
    toggleMenuShown()
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <img src={header_logo} />
        <div className={styles.name}>洪九全球供应链管理系统</div>
        <CollapseIcon
          className={styles.collapseIcon}
          onClick={handleToggleMenuShown}
        />
      </div>
      <div className={styles.right}>
        {/* 下载链接 */}
        <div className={styles.item}>
          <Download />
        </div>
        {/* 多语言选择 */}
        <div className={styles.item}>
          <Lang />
        </div>
        {/* 使用说明 */}
        <div className={styles.item}>
          <Explain />
        </div>
        <div className={styles.item}>
          <UserInfo />
        </div>
      </div>
    </div>
  )
}

export default AppHeader
