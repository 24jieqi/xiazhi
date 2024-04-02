import { Result as ResultBailu } from '@fruits-chain/react-bailu'
import type { ResultProps } from '@fruits-chain/react-bailu/es/result/interface'
import { Button, Space } from 'antd'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.less'

const Result: React.FC<{ text: string } & Pick<ResultProps, 'status'>> = ({
  text,
  status,
}) => {
  const navigate = useNavigate()

  return (
    <div className="chunfen-result">
      <ResultBailu
        status={status}
        title={
          <>
            <p className="chunfen-result-text">{text}</p>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  navigate('/')
                }}>
                返回首页
              </Button>
              <Button
                onClick={() => {
                  navigate(-1)
                }}>
                返回上一页
              </Button>
            </Space>
          </>
        }
      />
    </div>
  )
}

export default memo(Result)
