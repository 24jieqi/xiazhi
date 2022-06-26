import React from 'react'
import loading from '@/images/loading.png'
import styles from './style.module.less'
const LoadingPage: React.FC = () => {
  return (
    <div className={styles.loadingPage}>
      <img src={loading} alt="" className={styles.loading} />
    </div>
  )
}

export default LoadingPage
