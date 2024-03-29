import { Button, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useState } from 'react'

interface UploadResp {
  data: string
}

interface UploadXlsxProps {
  onUploadSuccess: (url: string, callback?: () => void) => void
}

const UploadXlsx: React.FC<UploadXlsxProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false)
  function handleOnChange(info: UploadChangeParam<UploadFile<UploadResp>>) {
    setLoading(true)
    if (info.file.status === 'done') {
      onUploadSuccess(info.file.response.data, () => {
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
      action="/_upload"
      onChange={handleOnChange}
      maxCount={1}>
      <Button size="small" type="primary" loading={loading}>
        Excel导入
      </Button>
    </Upload>
  )
}

export default UploadXlsx
