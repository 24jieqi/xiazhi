import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type PageAllPublicEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
}>

export type PageAllPublicEntriesQuery = {
  pageAllPublicEntries?: Array<{
    __typename?: 'EntryItem'
    entry_id: number
    key?: string
    createdAt?: number
    updatedAt?: number
    public?: boolean
    archive?: boolean
    deleted?: boolean
    langs?: any
    modifyRecords?: Array<{
      __typename?: 'RecordItem'
      record_id: number
      createdAt?: number
      entryEntry_id?: number
      prevLangs?: any
    }>
  }>
}

export const PageAllPublicEntriesDocument = gql`
  query PageAllPublicEntries($pageSize: Int!, $pageNo: Int!) {
    pageAllPublicEntries(pageSize: $pageSize, pageNo: $pageNo) {
      entry_id
      key
      createdAt
      updatedAt
      public
      archive
      deleted
      modifyRecords {
        record_id
        createdAt
        entryEntry_id
        prevLangs
      }
      langs
    }
  }
`

/**
 * __usePageAllPublicEntriesQuery__
 *
 * To run a query within a React component, call `usePageAllPublicEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageAllPublicEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageAllPublicEntriesQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNo: // value for 'pageNo'
 *   },
 * });
 */
export function usePageAllPublicEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    PageAllPublicEntriesQuery,
    PageAllPublicEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    PageAllPublicEntriesQuery,
    PageAllPublicEntriesQueryVariables
  >(PageAllPublicEntriesDocument, options)
}
export function usePageAllPublicEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageAllPublicEntriesQuery,
    PageAllPublicEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    PageAllPublicEntriesQuery,
    PageAllPublicEntriesQueryVariables
  >(PageAllPublicEntriesDocument, options)
}
export type PageAllPublicEntriesQueryHookResult = ReturnType<
  typeof usePageAllPublicEntriesQuery
>
export type PageAllPublicEntriesLazyQueryHookResult = ReturnType<
  typeof usePageAllPublicEntriesLazyQuery
>
export type PageAllPublicEntriesQueryResult = Apollo.QueryResult<
  PageAllPublicEntriesQuery,
  PageAllPublicEntriesQueryVariables
>
