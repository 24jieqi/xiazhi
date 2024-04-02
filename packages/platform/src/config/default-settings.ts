import type { CheckboxOptionType } from 'antd'

// 表单栅格配置
const fromRowProps = { gutter: { xs: 0, sm: 24 } }
const fromColProps = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 12 },
  xl: { span: 12 },
  xxl: { span: 8 },
}

// 列表上查询条件表单布局配置
const listSearchFromItemProps = {
  rowProps: { gutter: { xs: 12, sm: 24 } },
  colProps: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 6 },
  },
}
const listSearchFromProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 8 },
    xxl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 14 },
    lg: { span: 14 },
    xl: { span: 16 },
    xxl: { span: 16 },
  },
}
/**
 * 列表类页面常量配置
 */
// 列表横向滚动临界值
const listTableScrollX = 1440
// 组件间间距
const listPageSpaceSize = 24
// 操作按钮间距
const listActionSpaceSize = 8
// 表单控件缩进距离
const formControlIndent = 32
// 柜次的宽度
const cabinetBatchCodeW = 150
// 柜号的宽度
const cabinetCodeW = 140
// 状态的宽度
const statusW = 130
// 启用/禁用状态配置
const StatusOptions: Array<CheckboxOptionType> = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 99,
  },
]

const MaxPageSizeOptions = ['10', '20', '50', '100', '200', '500']

export {
  fromColProps,
  fromRowProps,
  listSearchFromProps,
  listSearchFromItemProps,
  listTableScrollX,
  listPageSpaceSize,
  listActionSpaceSize,
  formControlIndent,
  cabinetBatchCodeW,
  cabinetCodeW,
  statusW,
  StatusOptions,
  MaxPageSizeOptions,
}
