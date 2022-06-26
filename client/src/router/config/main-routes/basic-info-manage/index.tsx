import React from 'react'
import BlankLayout from '@/layouts/blank-layout'
import SopList from '@/pages/basic-info-manage/sop/list'
import LicenseList from '@/pages/basic-info-manage/license/list'
import LicenseDetail from '@/pages/basic-info-manage/license/detail'
import { CustomRouteConfig } from '../../index'
import { LICENSE, LICENSE_DETAIL, MODULE_INDEX, SOP } from './path'

const routes: CustomRouteConfig = {
  path: MODULE_INDEX,
  element: <BlankLayout />,
  authKey: 'basicInformationManagement',
  meta: {
    title: 'basicInformationManagement',
    icon: 'FormOutlined',
    isMenu: true,
  },
  breadcrumb: [{ name: 'basicInformationManagement' }],
  children: [
    {
      path: SOP,
      authKey: 'basicInformationManagement',
      element: <SopList />,
      meta: {
        title: 'SOPManagement',
        isMenu: true,
      },
      breadcrumb: [
        { name: 'basicInformationManagement' },
        { name: 'SOPManagement' },
      ],
    },
    // 许可核销
    {
      path: LICENSE,
      element: <LicenseList />,
      authKey: 'licenseManagement',
      meta: {
        title: 'licenseManagement',
        isMenu: true,
      },
      breadcrumb: [
        { name: 'basicInformationManagement' },
        { name: 'licenseManagement' },
      ],
    },
    {
      path: LICENSE_DETAIL,
      element: <LicenseDetail />,
      authKey: false,
      meta: {
        title: 'licenseDetail',
        isMenu: true,
      },
      breadcrumb: [
        { name: 'basicInformationManagement' },
        { name: 'licenseManagement', path: LICENSE },
        { name: '许可详情' },
      ],
    },
  ],
}

export default routes
