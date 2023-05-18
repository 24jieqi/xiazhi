import { Avatar, Card, message } from 'antd'
import React from 'react'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components'
import useUser from '@/stores/user'
import usePermissions from '@/stores/permissions'
import { roleValueEnums } from '@/pages/auth/regist'
import { generateUploadFileList } from '@/pages/application/detail/sections/basic-info'
import { UserRoleEnum } from '@/graphql/generated/types'
import { useUpdateUserInfoMutation } from '@/graphql/operations/__generated__/auth.generated'
import { getPictureUrlList } from '@/pages/application/add'

const { Meta } = Card

interface FormRecord {
  name: string
  nickName: string
  avatar: any
  role: UserRoleEnum
}

const UserCard: React.FC = () => {
  const { info, fetchUser } = useUser()
  const { clear } = usePermissions()
  const [form] = ProForm.useForm()
  const [updateUserInfo] = useUpdateUserInfoMutation()
  function handleLogout() {
    clear()
  }
  async function handleUpdateUserInfo(formData: FormRecord) {
    await updateUserInfo({
      variables: {
        name: formData.name,
        nickName: formData.nickName,
        avatar: getPictureUrlList(formData.avatar)[0],
        role: formData.role,
      },
    })
    message.success('修改用户信息成功！')
    await fetchUser()
    return true
  }
  return (
    <Card
      bordered={false}
      actions={[
        <ModalForm<FormRecord>
          preserve={false}
          form={form}
          modalProps={{
            maskClosable: false,
            destroyOnClose: true,
            centered: true,
          }}
          onFinish={handleUpdateUserInfo}
          initialValues={{
            name: info.name,
            nickName: info.nickName,
            avatar: generateUploadFileList(info.avatar ? [info.avatar] : []),
            role: info.role,
          }}
          trigger={<EditOutlined key="edit" />}
          key="edit"
          title="修改用户信息">
          <ProForm.Group>
            <ProFormText name="name" label="姓名" tooltip="推荐使用真实姓名" />
            <ProFormText name="nickName" label="昵称" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name="role"
              label="角色"
              valueEnum={roleValueEnums}
            />
          </ProForm.Group>
          <ProFormUploadButton
            name="avatar"
            label="头像"
            max={2}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
            action="/_upload"
          />
        </ModalForm>,
        <LogoutOutlined key="logout" onClick={handleLogout} />,
      ]}>
      <Meta
        avatar={<Avatar src={info.avatar} />}
        title={info.name}
        description={info.email}
      />
    </Card>
  )
}

export default UserCard
