import {
  CheckCard,
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components'
import { debounce } from 'lodash'
import React from 'react'
import { useInviteCollaboratorsMutation } from '@/graphql/operations/__generated__/app.generated'
import { useListUserFuzzyByUserNameLazyQuery } from '@/graphql/operations/__generated__/basic.generated'

interface AddCollaboratorsModalProps {
  trigger: JSX.Element
  appId: number
  onInviteSuccess?: () => void
}

interface FormData {
  keywords: string
  userList: number[]
}

const AddCollaboratorsModal: React.FC<AddCollaboratorsModalProps> = ({
  trigger,
  appId,
  onInviteSuccess,
}) => {
  const [listUserFuzzySearch, { data: userListData, loading }] =
    useListUserFuzzyByUserNameLazyQuery()
  const [inviteCollaborators] = useInviteCollaboratorsMutation()
  function seacrhUser(keywords: string) {
    listUserFuzzySearch({
      variables: {
        keywords,
      },
    })
  }
  const searchUserDebounced = debounce(seacrhUser, 500)
  function handleValuesChange(changedValues: any, values: any) {
    const keys = Object.keys(changedValues)
    const keywords = values.keywords || ''
    if (keys.includes('keywords')) {
      searchUserDebounced(keywords)
    }
  }
  async function handleAddCollaborators(formData: FormData) {
    await inviteCollaborators({
      variables: {
        appId,
        userIdList: formData.userList,
      },
    })
    onInviteSuccess?.()
    return true
  }
  const userList = userListData?.listUserFuzzyByUserName || []
  return (
    <ModalForm<FormData>
      modalProps={{
        maskClosable: false,
      }}
      onValuesChange={handleValuesChange}
      onFinish={handleAddCollaborators}
      title="添加协作者"
      trigger={trigger}>
      <ProFormText
        name="keywords"
        label="协作者名称"
        placeholder="请输入协作者名称模糊查询"
      />
      <ProForm.Item
        label="协作者列表"
        name="userList"
        rules={[
          {
            required: true,
            message: '请添加至少一个协作者',
          },
        ]}>
        <CheckCard.Group multiple loading={loading}>
          {userList.map(user => (
            <CheckCard
              key={user.user_id}
              title={user.name}
              description={user.email}
              value={user.user_id}
            />
          ))}
        </CheckCard.Group>
      </ProForm.Item>
    </ModalForm>
  )
}

export default AddCollaboratorsModal
