import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { click, selectOption, cascaderOption, type, upload } from './utils'

function setup(jsx) {
  const user = userEvent.setup()
  const result = {
    user,
    ...render(jsx),
    /**
     * 点击事件
     */
    click: click(user),
    /**
     * 输入事件
     */
    type: type(user),
    /**
     * 上传事件
     */
    upload: upload(user),
    /**
     * antd Select组件选择
     */
    selectOption: selectOption(user),
    /**
     * antd Cascader联级选择
     */
    cascaderOption: cascaderOption(user),
    /**
     * 获取antd 表格行数据
     * @returns
     */
    getTableRows: (container?: HTMLElement) => {
      const _container = container || result.container
      return _container.querySelectorAll(
        'tr.ant-table-row',
      ) as NodeListOf<HTMLElement>
    },
  }
  return result
}

export default setup
