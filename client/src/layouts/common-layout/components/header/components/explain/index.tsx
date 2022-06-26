import React from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from '../../index.module.less'
interface IProps {}
const Explain: React.FC<IProps> = () => {
  // 路径是约定的，如果有修改直接替换原来的文件
  return (
    <a
      href="https://fruits-public.obs.cn-southwest-2.myhuaweicloud.com/files/%E6%B4%AA%E4%B9%9DGSCM%E7%B3%BB%E7%BB%9F-%E8%93%9D%E7%9A%AE%E4%B9%A6.pdf"
      target="_blank"
      rel="noreferrer">
      <div className={styles.box}>
        <QuestionCircleOutlined />
      </div>
    </a>
  )
}

export default Explain
