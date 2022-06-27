import create from 'zustand'
import _create from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import client from '@/graphql/client'

type PermissionState = {
  permissions: string[]
  token: string
  setToken: (token: string) => void
  clear: () => void
}

export const permissionKey = 'demo-permissions'

export const permissionStore = _create<PermissionState>(
  persist(
    set => ({
      permissions: null,
      token: '',
      clear: () => {
        set({ permissions: null, token: '' })
      },
      setToken: token => {
        set({ token })
      },
    }),
    {
      name: permissionKey,
    },
  ),
)

const usePermissions = create(permissionStore)

export default usePermissions
