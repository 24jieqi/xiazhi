import { QrcodeOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React, { useEffect, useState } from 'react'
import imgs from '@/assets/images'
import styles from './style.module.less'

const Download: React.FC = () => {
  const [url] = useState(null)
  useEffect(() => {
    // getLastAndroidApp().then((res) => {
    //   setUrl(res.result)
    // })
  }, [])
  const overlay = (
    <div className={styles.container}>
      <p className={styles.title}>GSCM安卓版</p>
      <p className={styles.desc}>安卓用户请使用浏览器扫描二维码下载</p>
      <p className={styles.desc}>IOS用户请联系管理员下载</p>
    </div>
  )
  return url ? (
    <Dropdown overlay={overlay} className={styles.box} placement="bottomCenter">
      <QrcodeOutlined />
    </Dropdown>
  ) : null
}

export default Download
