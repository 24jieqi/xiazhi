import { useLocation } from 'react-router-dom'
import { Dict, execFunction } from 'wbd-frontend-kit'
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from '../storage/session'

export const CURRENT_PATH_KEY = 'GSCM_KEEP_STATE_KEY'
export const CURRENT_PATH_PARAMS = 'GSCM_KEEP_STATE_PARAMS'

interface CachedParams<ParamsType = any> {
  query: ParamsType
  pagination: {
    page: number
    size: number
  }
}

const initParams: CachedParams = {
  query: {},
  pagination: {
    page: 1,
    size: 10,
  },
}

export function cacheState(params: CachedParams, pathname: string) {
  setSessionStorage(CURRENT_PATH_KEY, pathname)
  setSessionStorage(CURRENT_PATH_PARAMS, params)
}

export function getCachedOptions(pathname: string): CachedParams {
  const targetPathName = getSessionStorage(CURRENT_PATH_KEY, initParams)
  if (pathname === targetPathName) {
    return getSessionStorage(CURRENT_PATH_PARAMS)
  }
  return initParams
}

export function removeCachedState() {
  removeSessionStorage(CURRENT_PATH_KEY)
  removeSessionStorage(CURRENT_PATH_PARAMS)
}

export const useCachedState: () => [
  (params: CachedParams) => void,
  CachedParams,
] = () => {
  const location = useLocation()
  function internalCacheState(params: CachedParams) {
    cacheState(params, location.pathname)
  }
  return [internalCacheState, getCachedOptions(location.pathname)]
}

// 格式化表单数据

export function formatFormData(
  query: Dict,
  initValue?: Dict,
  formatter?: (key: string, val: any) => any,
) {
  const result = {
    ...initValue,
  }
  const keys = Object.keys(query)
  if (!keys.length) {
    return result
  }
  for (const key of keys) {
    if (!formatter) {
      result[key] = query[key]
    } else {
      const temp = execFunction(formatter, key, query[key])
      result[key] = temp
    }
  }
  return result
}
