import layout from './layout/index'
import login from './login'
import basicInfo from './basic-info-manage'
import menu from './menu'
import common from './common'
import internationalDelivery from './international-delivery'

export default {
  langs: [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
    { label: 'ภาษาไทย', value: 'th-TH' },
    { label: 'ViệtName', value: 'vi-VN' },
  ],
  // notice: 严格按照顺序排列
  stateList: [
    { value: '00', label: '新增' },
    { value: '01', label: '出口已订舱' },
    { value: '02', label: '出口待装箱' },
    { value: '03', label: '出口已装箱' },
    { value: '05', label: '出口已送港' },
    { value: '06', label: '出口已起航' },
    { value: '066', label: '许可已核销' },
    // { value: '07', label: '国内已报关' },
    { value: '070', label: '国内可提柜' },
    { value: '071', label: '到达堆场' },
    { value: '08', label: '国内待发运' },
    { value: '09', label: '国内已验货' },
    { value: '10', label: '国内已提货' },
    { value: '11', label: '国内待转柜' },
    { value: '12', label: '国内已发运' },
    { value: '13', label: '国内已到达' },
    { value: '14', label: '国内已收货' },
    { value: '15', label: '已还箱' },
  ],
  layout,
  login,
  basicInfo,
  menu,
  common,
  internationalDelivery,
}
