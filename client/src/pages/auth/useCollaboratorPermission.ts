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
  const isCollaborator = info.user_id !== creatorId
  const navigate = useNavigate()
  useEffect(() => {
    if (isCollaborator && showAlert) {
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
  }, [isCollaborator, showAlert])
  function checkIsCollaborator(creatorId: number) {
    return info.user_id !== creatorId
  }
  return {
    isCollaborator,
    checkIsCollaborator,
  }
}

export default useCollaboratorPermissions
