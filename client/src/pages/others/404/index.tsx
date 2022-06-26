import React from 'react'
import styles from './style.module.less'
import img404 from './images/404@2x.png'
const NoDataPage: React.FC = () => {
  return (
    <div className={styles.noPage}>
      <img src={img404} alt="" className={styles.img404} />
      <p className={styles.tips}>哎呀，出错了！你访问的页面不存在…</p>
    </div>
  )
}

export default NoDataPage
