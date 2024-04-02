import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import pkgJSON from '@/../package.json'

import { sleep } from '@/utils'

type UserInfo = { name: string }

type UserState = {
  info: UserInfo
  token: string
  clear: () => void
  setUser: (user: UserInfo) => void
  setToken: (t: string) => void
  fetchUser: () => Promise<UserInfo>
  refreshToken: () => Promise<void>
}

const useUser = create(
  persist<UserState>(
    (set, get) => ({
      info: null,
      token: '',
      merchant: null,
      setUser: user => {
        set({ info: user })
      },
      setToken: v => {
        set({
          token: v,
        })
      },
      fetchUser: async () => {
        const { token } = get()
        if (!token) {
          return Promise.reject(new Error('暂未登录'))
        }
        try {
          const info = await sleep<UserInfo>(500, { name: 'xx用户' })
          set({ info: info })
          return info
        } catch {}
      },
      async refreshToken() {
        const { token } = get()
        if (!token) {
          throw new Error('暂未登录')
        }
        // tips
        try {
          const _token = await sleep<string>(300, 'token' + Date.now())
          set({
            token: _token,
          })
        } catch (error) {}
      },
      clear() {
        set({ token: '', info: null })
      },
    }),
    {
      name: `${pkgJSON.name}_${pkgJSON.version}`,
    },
  ),
)

export default useUser
