import {
  CheckCard,
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components'
import { debounce } from 'lodash'
import React from 'react'
import { Select } from 'antd'
import { useInviteCollaboratorsMutation } from '@/graphql/operations/__generated__/app.generated'
import { useListUserFuzzyByUserNameLazyQuery } from '@/graphql/operations/__generated__/basic.generated'
import {
  CollaboratorRoleEnum,
  CollaboratorsInput,
} from '@/graphql/generated/types'

interface AddCollaboratorsModalProps {
  trigger: JSX.Element
  appId: number
  onInviteSuccess?: () => void
}

interface FormData {
  keywords: string
  userList: number[]
  role: (CollaboratorRoleEnum | undefined)[]
}

const roleOptions = [
  {
    label: '访客',
    value: CollaboratorRoleEnum.Guest,
  },
  {
    label: '成员',
    value: CollaboratorRoleEnum.Translator,
  },
  {
    label: '管理员',
    value: CollaboratorRoleEnum.Manager,
  },
]

function getUserRoleList(data: FormData) {
  const result: CollaboratorsInput[] = []
  for (const userId of data.userList) {
    result.push({
      userId,
      role: data.role?.[userId] || CollaboratorRoleEnum.Translator,
    })
  }
  return result
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
        userIdList: getUserRoleList(formData),
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
      title="邀请协作者"
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
              description={
                <div>
                  <p>{user.email}</p>
                  <ProForm.Item
                    label="角色"
                    name={['role', user.user_id]}
                    rules={[{ required: true, message: '请选择协作者角色' }]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}>
                    <Select
                      placeholder="请选择"
                      onClick={e => e.stopPropagation()}
                      options={roleOptions}
                    />
                  </ProForm.Item>
                </div>
              }
              value={user.user_id}
            />
          ))}
        </CheckCard.Group>
      </ProForm.Item>
    </ModalForm>
  )
}

export default AddCollaboratorsModal
