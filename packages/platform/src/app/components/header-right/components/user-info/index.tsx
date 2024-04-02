import { ExclamationCircleOutlined } from '@ant-design/icons'
import { App, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import React, { useCallback, memo } from 'react'

// import useNavigateToLogin from '@/app/useNavigateToLogin'
import { useAccess, IconBox } from '@/chunfen'
import { useI18n } from '@/i18n/context'
import useUser from '@/stores/user'
import { sleep } from '@/utils'

import STYLES from './style.module.less'

interface IProps {}

const UserInfo: React.FC<IProps> = () => {
  // const navigateToLogin = useNavigateToLogin()
  const { modal } = App.useApp()
  const { I18N } = useI18n()
  const { setAccess } = useAccess()
  const { info: userInfo, clear } = useUser()

  const action: MenuProps['onClick'] = useCallback(
    ({ key }) => {
      switch (key) {
        // 退出登录
        case 'logout':
          modal.confirm({
            title: I18N.layout.header.logoutTips,
            icon: <ExclamationCircleOutlined />,
            okText: I18N.layout.header.ok,
            cancelText: I18N.layout.header.cancel,
            maskClosable: false,
            onOk: async () => {
              try {
                await sleep(500)
              } catch {}
              clear()
              setAccess([])
              // navigateToLogin()
            },
          })
          break
        default:
          break
      }
    },
    [
      I18N.layout.header.cancel,
      I18N.layout.header.logoutTips,
      I18N.layout.header.ok,
      setAccess,
      clear,
      modal,
    ],
  )
  return (
    <Dropdown
      menu={{
        onClick: action,
        items: [
          // {
          //   key: 'changePassword',
          //   label: I18N.layout.header.changePassword,
          // },
          {
            key: 'logout',
            label: I18N.layout.header.logout,
          },
        ],
      }}
      trigger={['click']}>
      <IconBox>
        <div className={STYLES.userInfoWrap}>
          {/* <img src={userInfo?.avatar} alt="" className={STYLES.avatar} /> */}
          <div className={STYLES.name}>{userInfo?.name}</div>
        </div>
      </IconBox>
    </Dropdown>
  )
}

export default memo(UserInfo)
