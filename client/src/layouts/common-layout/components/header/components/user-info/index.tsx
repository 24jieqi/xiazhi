/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Dropdown, Form, Input, Menu, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useToggleState } from 'wbd-frontend-kit'
import usePermissions from '@/stores/permissions'
import useUser from '@/stores/user'
// import {
//   useResetPasswordMutation,
//   useUpdatePasswordMutation,
// } from '@/graphql/gqls/role/__generated__/role.generated'
import { LOGIN_PATH } from '@/router/config/basePath'
import styles from './style.module.less'

interface IProps {}

const UserInfo: React.FC<IProps> = () => {
  const { clear } = usePermissions()
  const { info: userInfo, setUpdatePassword, fetchUser } = useUser()
  // const [resetPwd, { loading }] = useResetPasswordMutation()
  // const [updatePwd, { loading: updateLoading }] = useUpdatePasswordMutation()
  const navigate = useNavigate()
  const action = ({ key }) => {
    switch (key) {
      // 退出登录
      case 'logout':
        Modal.confirm({
          title: '退出登录',
          icon: <ExclamationCircleOutlined />,
          okText: '退出登录',
          cancelText: '取消',
          maskClosable: false,
          onOk: () => clear(),
        })
        break
      // 修改密码
      case 'changePassword':
        toggleVisible()
        break

      default:
        break
    }
  }
  const menu = (
    <Menu onClick={action}>
      <Menu.Item key="changePassword">修改密码</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  const [visible, toggleVisible] = useToggleState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchUser()
  }, [])
  const handleOk = () => {
    form.validateFields().then(async res => {
      const success = () => {
        message.success('修改密码成功')
        setUpdatePassword(false)
        toggleVisible()
        navigate(LOGIN_PATH)
      }
      // await updatePwd({
      //   variables: {
      //     input: {
      //       oldPwd: res.oldPassword,
      //       password: res.newPassword,
      //     },
      //   },
      // })
      success()
    })
  }
  // 重复验证:修改密码前后两次密码一致
  const repeatValueVerify = () => {
    return () => ({
      validator(_, value) {
        const password = form.getFieldValue('pwd')
        if (password !== value) {
          return Promise.reject(new Error('两次密码不一致'))
        } else {
          return Promise.resolve()
        }
      },
    })
  }
  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.userInfoWrap}>
          {/* <img src={userInfo?.avatar} alt="" className={styles.avatar} /> */}
          <div className={styles.name}>{userInfo?.userName}</div>
        </div>
      </Dropdown>
      <Modal
        maskClosable={false}
        visible={visible}
        onCancel={() => {
          toggleVisible()
        }}
        title="修改密码"
        onOk={handleOk}
        confirmLoading={false}>
        <Form labelCol={{ span: 6 }} form={form}>
          <Form.Item label="旧密码" name="oldPwd">
            <Input />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="pwd"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              repeatValueVerify(),
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserInfo
