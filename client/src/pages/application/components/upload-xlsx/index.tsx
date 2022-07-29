import { Button, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useState } from 'react'

interface UploadResp {
  accessType: number
  contentType: string
  createTime: number
  fileCreateTime?: number
  fileId: string
  fileUrl: string
  filename?: string
  size: number
  tags?: string[]
  updateTime?: number
}

interface UploadXlsxProps {
  onUploadSuccess: (url: string, callback?: () => void) => void
}

const UploadXlsx: React.FC<UploadXlsxProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false)
  function handleOnChange(info: UploadChangeParam<UploadFile<UploadResp>>) {
    setLoading(true)
    if (info.file.status === 'done') {
      onUploadSuccess(info.file.response.fileUrl, () => {
        setLoading(false)
      })
    }
    if (info.file.status === 'error') {
      setLoading(false)
    }
  }
  return (
    <Upload
      showUploadList={false}
      key="uplaod"
      action="/_files/upload"
      onChange={handleOnChange}
      maxCount={1}>
      <Button size="small" type="primary" loading={loading}>
        导入
      </Button>
    </Upload>
  )
}

export default UploadXlsx
