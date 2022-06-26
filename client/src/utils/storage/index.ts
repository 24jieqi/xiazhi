import { isJSON } from '@/utils/index'
export function setLocalStorage(key: string, value) {
  let str = ''
  if (typeof value === 'object') {
    str = JSON.stringify(value)
  } else {
    str = value
  }
  localStorage.setItem(key, str)
}

export function getLocalStorage(key: string, defaultValue = null) {
  const value = localStorage.getItem(key)

  let res = value
  if (isJSON(value)) {
    res = JSON.parse(value)
  }
  return res !== null ? res : defaultValue
}

export function removeLocalStorage(key: string) {
  return localStorage.removeItem(key)
}
