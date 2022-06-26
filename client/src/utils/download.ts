import { message } from 'antd'

// 根据url下载文件
export const download = url => {
  try {
    let elemIF = document.createElement('iframe')
    elemIF.src = url
    elemIF.style.display = 'none'
    document.body.appendChild(elemIF)
    setTimeout(() => {
      document.body.removeChild(elemIF)
    }, 2000)
  } catch (e) {
    message.error('下载异常！')
  }
}
