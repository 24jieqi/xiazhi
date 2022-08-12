import create from 'zustand'
import client from '@/graphql/client'
import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
} from '@/graphql/operations/__generated__/auth.generated'
import { UserInfo } from '@/graphql/generated/types'

type UserState = {
  info: UserInfo
  needUpdatePassword: boolean
  setUser: (user: UserInfo) => void
  setUpdatePassword: (needUpdatePassword: boolean) => void
  fetchUser: () => Promise<UserInfo>
}

const useUser = create<UserState>(set => ({
  info: {},
  needUpdatePassword: false,
  setUpdatePassword: needUpdatePassword => {
    set({ needUpdatePassword })
  },
  setUser: user => {
    set({ info: user })
  },
  fetchUser: async () => {
    const res = await client.query<GetCurrentUserQuery>({
      query: GetCurrentUserDocument,
    })
    const info = res?.data?.getCurrentUser
    set({ info })
    return null
  },
}))

export default useUser
