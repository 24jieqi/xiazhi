import type { AccessContextState } from '../interface'

import { useAccess } from '.'

let accessInstance: AccessContextState = {
  loading: false,
  access: [],
  setAccess: () => {},
  hasAccess: () => false,
  updateAccess: () => Promise.reject(new Error('没有初始化')),
}

export function getAccess() {
  return accessInstance
}

const AccessHelper = () => {
  const accessState = useAccess()
  accessInstance = accessState
  return null
}

export default AccessHelper
