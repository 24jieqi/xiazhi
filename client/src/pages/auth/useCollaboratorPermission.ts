import { useEffect } from 'react'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import useUser from '@/stores/user'

interface CollaboratorConfig {
  creatorId?: number
  showAlert?: boolean
}

const useCollaboratorPermissions = (
  { creatorId, showAlert }: CollaboratorConfig = {
    creatorId: null,
    showAlert: false,
  },
) => {
  const { info } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (
      typeof creatorId === 'undefined' ||
      typeof info?.user_id === 'undefined'
    ) {
      return
    }
    if (info?.user_id !== creatorId && showAlert) {
      Modal.error({
        title: '权限错误',
        content: '你暂无权限访问此页面',
        okText: '返回',
        onOk() {
          navigate(-1)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorId, showAlert, info?.user_id])
  function checkIsCollaborator(creatorId: number) {
    return info.user_id !== creatorId
  }
  return {
    isCollaborator: info.user_id !== creatorId,
    checkIsCollaborator,
  }
}

export default useCollaboratorPermissions
