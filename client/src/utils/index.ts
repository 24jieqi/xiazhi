import { Dict } from 'wbd-frontend-kit'
import dayjs from 'dayjs'

/**
 * 判断str是否是json字符串
 * @param str
 */
export const isJSON = (str: string) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}

/**
 * 删除对象中value为null的项
 */
export function objectFilterNotNull(obj: Dict) {
  const result = {}
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (obj[key] !== null) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 去除对象中所有符合条件的对象(还有点小问题数组的子对象)
 * @param {Object} obj 来源对象
 *
 */
export function objectDelNull(obj) {
  if (!obj) {
    return false
  }
  const result = {}
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (
      obj[key] !== null &&
      obj[key] !== '' &&
      typeof obj[key] !== 'undefined'
    ) {
      if (Array.isArray(obj[key])) {
        result[key] = obj[key]?.map(v =>
          typeof v === 'object' ? objectDelNull(v) : v,
        )
      } else {
        if (typeof obj[key] === 'object') {
          result[key] = objectDelNull(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
  })
  return result
}

export function selectFilterOption(input, option) {
  const label = option.label || option.children
  return label?.indexOf(input) >= 0
}

interface transformTimeOption {
  mode?: 'date' | 'time'
  format?: string
}
export function transformTime(
  time: number,
  option: transformTimeOption = { mode: 'time', format: '' },
) {
  if (!time || typeof time !== 'number') {
    return ''
  }
  if (option.format) {
    return dayjs(time).format(option.format)
  }
  if (option.mode === 'date') {
    return dayjs(time).format('YYYY-MM-DD')
  } else {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
  }
}

/**
 * 验证空数据
 * @param message
 * @returns
 */
export const emptyVerifyRule = (message = '') => {
  return {
    validator(_, val) {
      if (val) {
        return Promise.resolve()
      }
      return Promise.reject(message)
    },
  }
}

/**
 *
 * @param message
 * @returns
 */
export const phoneVerifyRule = (message = '') => {
  return {
    validator(_, val) {
      if (!val) {
        return Promise.resolve()
      }
      const reg = /^\d{11}$/
      if (reg.test(val)) {
        return Promise.resolve()
      }
      return Promise.reject(message)
    },
  }
}

/**
 * 密码的校验
 * 密码长度为8-20位，必须包含数字、大写字母、小写字母、特殊字符
 * @param message
 * @returns
 */
export const checkPassword = (message: string) => {
  return {
    validator(_, val) {
      if (!val) {
        return Promise.resolve()
      }
      const reg =
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/
      if (reg.test(val)) {
        return Promise.resolve()
      }
      return Promise.reject(message)
    },
  }
}

/**
 *
 * @param message
 * @returns
 */
export const idNumberVerifyRule = (message = '') => {
  return {
    validator(_, val) {
      if (!val) {
        return Promise.resolve()
      }
      const reg = /^\d{17}(\d|X|x)$/
      if (reg.test(val)) {
        return Promise.resolve()
      }
      return Promise.reject(message)
    },
  }
}

export function verifyDateDistance(dates: Date[], distance: number) {
  if (dates) {
    return dayjs(dates[0]).isAfter(dayjs(dates[1]).subtract(distance, 'day'))
  }
  return false
}
