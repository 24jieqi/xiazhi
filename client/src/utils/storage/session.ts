import { isJSON } from '@/utils/index'
export function setSessionStorage(key: string, value) {
  let str = ''
  if (typeof value === 'object') {
    str = JSON.stringify(value)
  } else {
    str = value
  }
  sessionStorage.setItem(key, str)
}

export function getSessionStorage(key: string, defaultValue = null) {
  const value = sessionStorage.getItem(key)

  let res = value
  if (isJSON(value)) {
    res = JSON.parse(value)
  }
  return res !== null ? res : defaultValue
}

export function removeSessionStorage(key: string) {
  return sessionStorage.removeItem(key)
}
