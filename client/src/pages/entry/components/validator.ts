import client from '@/graphql/client'
import {
  ValidEntryKeyDocument,
  ValidEntryKeyQuery,
  ValidEntryKeyQueryVariables,
} from '@/graphql/operations/__generated__/entry.generated'

export const entryKeyValidator =
  (appId: number, entryId?: number) => async (_, val: string) => {
    if (!val) {
      return Promise.resolve()
    }
    const res = await client.query<
      ValidEntryKeyQuery,
      ValidEntryKeyQueryVariables
    >({
      query: ValidEntryKeyDocument,
      variables: {
        appId,
        entryId,
        key: val,
      },
    })
    if (res.data.validEntryKey) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('词条key不可用'))
    }
  }
