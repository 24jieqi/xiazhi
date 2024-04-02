import { setContext } from '@apollo/client/link/context'

import type { GetToken } from '../refresh-token/base'

export type SetTokenLinkConfig = {
  getToken: GetToken
}

export default function makeSetTokenLink({ getToken }: SetTokenLinkConfig) {
  return setContext((_, { headers = {} }) => {
    const token = getToken().accessToken
    return {
      token,
      headers: {
        ...headers,
        Authorization: token,
      },
    }
  })
}
