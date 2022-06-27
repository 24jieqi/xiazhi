import create from 'zustand'
import client from '@/graphql/client'
// import {
//   GetUserDocument,
//   GetUserQuery,
// } from '@/graphql/gqls/role/__generated__/role.generated'

type UserInfo = any

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
    // const res = await client.query<GetUserQuery>({
    //   query: GetUserDocument,
    // })
    // const info = res?.data?.getUser
    // set({ info })
    return null
  },
}))

export default useUser
