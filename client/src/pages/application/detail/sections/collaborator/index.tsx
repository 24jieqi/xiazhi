import React from 'react'
import { Button, Empty } from 'antd'
import {
  CheckCard,
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components'
import { debounce } from 'lodash'
import {
  useGetAppCollaboratorsQuery,
  useInviteCollaboratorsMutation,
} from '@/graphql/operations/__generated__/app.generated'
import { useListUserFuzzyByUserNameLazyQuery } from '@/graphql/operations/__generated__/basic.generated'
import { AppSection } from '../interface'

interface CollaboratorManagementProps extends AppSection {}

interface FormData {
  keywords: string
  userList: number[]
}

const CollaboratorManagement: React.FC<CollaboratorManagementProps> = ({
  app,
}) => {
  const { data, refetch } = useGetAppCollaboratorsQuery({
    variables: {
      appId: app.app_id,
    },
  })
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
        appId: app.app_id,
        userIdList: formData.userList,
      },
    })
    refetch()
    return true
  }
  const userList = userListData?.listUserFuzzyByUserName || []
  if (!data?.getAppCollaborators || !data?.getAppCollaborators.length) {
    return (
      <Empty description="还未添加协作者">
        <ModalForm<FormData>
          onValuesChange={handleValuesChange}
          onFinish={handleAddCollaborators}
          title="添加协作者"
          trigger={<Button type="primary">现在添加</Button>}>
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
      </Empty>
    )
  }
  return (
    <div>
      <p>协作者管理</p>
    </div>
  )
}

export default CollaboratorManagement
