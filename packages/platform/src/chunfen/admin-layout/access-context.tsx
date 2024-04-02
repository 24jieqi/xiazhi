import { useMemoizedFn } from 'ahooks'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { AccessContextState, AdminLayoutProps } from '../interface'

import AccessHelper from './access-helper'

export const AccessContext = createContext<AccessContextState>({
  loading: false,
  access: [],
  setAccess: () => {},
  hasAccess: () => false,
  updateAccess: () => Promise.reject(new Error('没有初始化')),
})

export const useAccess = () => useContext(AccessContext)

export const AccessProvider: React.FC<
  React.PropsWithChildren<Pick<AdminLayoutProps, 'requestAccess'>>
> = ({ children, requestAccess }) => {
  const [access, setAccess] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const hasAccess = useCallback(
    (v: string | string[]) => {
      const _access = Array.isArray(v) ? v : [v]
      // 只要命中一个基础权限，则表明该路由有权访问
      return _access.some(key => access.indexOf(key) > -1)
    },
    [access],
  )
  const updateAccess = useMemoizedFn(
    (quietness?: boolean) =>
      new Promise<void>(resolve => {
        if (!quietness) {
          setLoading(true)
        }
        const raValue = requestAccess?.()

        if (raValue?.then) {
          raValue.then(data => {
            console.warn('新权限 => ', data)
            setAccess(data)
            if (!quietness) {
              setLoading(false)
            }
            resolve()
          })
        } else {
          if (!quietness) {
            setLoading(false)
          }
          resolve()
        }
      }),
  )

  const value = useMemo<AccessContextState>(() => {
    return {
      loading,
      access,
      setAccess,
      hasAccess,
      updateAccess,
    }
  }, [access, hasAccess, updateAccess, loading])

  useEffect(() => {
    updateAccess()
  }, [updateAccess])

  return (
    <AccessContext.Provider value={value}>
      <AccessHelper />
      {children}
    </AccessContext.Provider>
  )
}
