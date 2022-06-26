/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Dropdown, Form, Input, Menu, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useToggleState } from 'wbd-frontend-kit'
import { useI18n } from '@/i18n/context'
import usePermissions from '@/stores/permissions'
import useUser from '@/stores/user'
import {
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} from '@/graphql/gqls/role/__generated__/role.generated'
import { LOGIN_PATH } from '@/router/config/basePath'
import styles from './style.module.less'

interface IProps {}

const UserInfo: React.FC<IProps> = () => {
  const { I18N } = useI18n()
  const { clear } = usePermissions()
  const {
    info: userInfo,
    needUpdatePassword,
    setUpdatePassword,
    fetchUser,
  } = useUser()
  const [resetPwd, { loading }] = useResetPasswordMutation()
  const [updatePwd, { loading: updateLoading }] = useUpdatePasswordMutation()
  useEffect(() => {
    if (needUpdatePassword) {
      action({ key: 'changePassword' })
    }
  }, [needUpdatePassword])
  const navigate = useNavigate()
  const action = ({ key }) => {
    switch (key) {
      // 退出登录
      case 'logout':
        Modal.confirm({
          title: I18N.layout.header.logoutTips,
          icon: <ExclamationCircleOutlined />,
          okText: I18N.layout.header.ok,
          cancelText: I18N.layout.header.cancel,
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
      <Menu.Item key="changePassword">
        {I18N.layout.header.changePassword}
      </Menu.Item>
      <Menu.Item key="logout">{I18N.layout.header.logout}</Menu.Item>
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
        message.success(I18N.layout.header.changeSuccess)
        setUpdatePassword(false)
        toggleVisible()
        navigate(LOGIN_PATH)
      }
      if (needUpdatePassword) {
        await resetPwd({
          variables: {
            input: {
              password: res?.pwd,
            },
          },
        })
        success()
      } else {
        await updatePwd({
          variables: {
            input: {
              oldPwd: res.oldPassword,
              password: res.newPassword,
            },
          },
        })
        success()
      }
    })
  }
  // 重复验证:修改密码前后两次密码一致
  const repeatValueVerify = () => {
    return () => ({
      validator(_, value) {
        const password = form.getFieldValue('pwd')
        if (password !== value) {
          return Promise.reject(I18N.layout.header.pwdDifferent)
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
        title={I18N.layout.header.pwdEdit}
        onOk={handleOk}
        confirmLoading={loading || updateLoading}>
        <Form labelCol={{ span: 6 }} form={form}>
          {needUpdatePassword ? (
            <Form.Item>{I18N.layout.header.firstPwdTips}</Form.Item>
          ) : (
            <Form.Item label={I18N.layout.header.oldPassword} name="oldPwd">
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label={I18N.layout.header.newPassword}
            name="pwd"
            rules={[
              {
                required: true,
                message: I18N.layout.header.pleaseEnterANewPassword,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={I18N.layout.header.confirmPassword}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: I18N.layout.header.pleaseEnterThePasswordAgain,
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
