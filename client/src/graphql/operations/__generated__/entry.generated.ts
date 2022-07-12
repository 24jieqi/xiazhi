import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type PageAllPublicEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
}>

export type PageAllPublicEntriesQuery = {
  pageAllPublicEntries?: {
    __typename?: 'EntryPaging'
    total: number
    pageSize: number
    current: number
    records?: Array<{
      __typename?: 'EntryItem'
      entry_id?: number
      key?: string
      createdAt?: number
      updatedAt?: number
      public?: boolean
      archive?: boolean
      deleted?: boolean
      mainLangText?: string
      mainLang?: SchemaTypes.LanguageTypeEnum
      langs?: any
      modifyRecords?: Array<{
        __typename?: 'RecordItem'
        record_id: number
        createdAt?: number
        entryEntry_id?: number
        prevLangs?: any
        currLangs?: any
        prevKey?: string
        currKey?: string
        creatorInfo?: {
          __typename?: 'UserInfo'
          name?: string
          user_id?: number
          email?: string
          nickName?: string
          phone?: string
          avatar?: string
        }
      }>
    }>
  }
}

export type CreateEntryMutationVariables = SchemaTypes.Exact<{
  appId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSONObject']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type CreateEntryMutation = { createEntry?: number }

export type UpdateEntryMutationVariables = SchemaTypes.Exact<{
  entryId: SchemaTypes.Scalars['Int']
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSONObject']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type UpdateEntryMutation = { updateEntry?: boolean }

export type PageAppEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
  appId: SchemaTypes.Scalars['Int']
  archive?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  startTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
  endTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
  mainLangText?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  latest?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type PageAppEntriesQuery = {
  pageAppEntries?: {
    __typename?: 'EntryPaging'
    total: number
    pageSize: number
    current: number
    records?: Array<{
      __typename?: 'EntryItem'
      entry_id?: number
      key?: string
      createdAt?: number
      updatedAt?: number
      public?: boolean
      archive?: boolean
      deleted?: boolean
      mainLangText?: string
      mainLang?: SchemaTypes.LanguageTypeEnum
      langs?: any
      modifyRecords?: Array<{
        __typename?: 'RecordItem'
        record_id: number
        createdAt?: number
        entryEntry_id?: number
        prevLangs?: any
        currLangs?: any
        prevKey?: string
        currKey?: string
        creator?: number
        creatorInfo?: {
          __typename?: 'UserInfo'
          name?: string
          user_id?: number
          email?: string
          nickName?: string
          phone?: string
          role?: SchemaTypes.UserRoleEnum
          avatar?: string
        }
      }>
    }>
  }
}

export type ChangeEntryAccessStatusMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  entryId: SchemaTypes.Scalars['Int']
  archive?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  deleted?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
}>

export type ChangeEntryAccessStatusMutation = {
  changeEntryAccessStatus?: boolean
}

export const PageAllPublicEntriesDocument = gql`
  query PageAllPublicEntries($pageSize: Int!, $pageNo: Int!) {
    pageAllPublicEntries(pageSize: $pageSize, pageNo: $pageNo) {
      total
      pageSize
      current
      records {
        entry_id
        key
        createdAt
        updatedAt
        public
        archive
        deleted
        mainLangText
        mainLang
        modifyRecords {
          record_id
          createdAt
          entryEntry_id
          prevLangs
          currLangs
          prevKey
          currKey
          creatorInfo {
            name
            user_id
            email
            nickName
            phone
            avatar
          }
        }
        langs
      }
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
export const CreateEntryDocument = gql`
  mutation CreateEntry($appId: Int, $langs: JSONObject, $key: String) {
    createEntry(appId: $appId, langs: $langs, key: $key)
  }
`
export type CreateEntryMutationFn = Apollo.MutationFunction<
  CreateEntryMutation,
  CreateEntryMutationVariables
>

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      langs: // value for 'langs'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCreateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEntryMutation,
    CreateEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(
    CreateEntryDocument,
    options,
  )
}
export type CreateEntryMutationHookResult = ReturnType<
  typeof useCreateEntryMutation
>
export type CreateEntryMutationResult =
  Apollo.MutationResult<CreateEntryMutation>
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<
  CreateEntryMutation,
  CreateEntryMutationVariables
>
export const UpdateEntryDocument = gql`
  mutation UpdateEntry($entryId: Int!, $langs: JSONObject, $key: String) {
    updateEntry(entryId: $entryId, langs: $langs, key: $key)
  }
`
export type UpdateEntryMutationFn = Apollo.MutationFunction<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>

/**
 * __useUpdateEntryMutation__
 *
 * To run a mutation, you first call `useUpdateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryMutation, { data, loading, error }] = useUpdateEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *      langs: // value for 'langs'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useUpdateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEntryMutation,
    UpdateEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(
    UpdateEntryDocument,
    options,
  )
}
export type UpdateEntryMutationHookResult = ReturnType<
  typeof useUpdateEntryMutation
>
export type UpdateEntryMutationResult =
  Apollo.MutationResult<UpdateEntryMutation>
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>
export const PageAppEntriesDocument = gql`
  query PageAppEntries(
    $pageSize: Int!
    $pageNo: Int!
    $appId: Int!
    $archive: Boolean
    $startTime: Float
    $endTime: Float
    $mainLangText: String
    $latest: Boolean
    $key: String
  ) {
    pageAppEntries(
      pageSize: $pageSize
      pageNo: $pageNo
      appId: $appId
      archive: $archive
      startTime: $startTime
      endTime: $endTime
      mainLangText: $mainLangText
      latest: $latest
      key: $key
    ) {
      total
      pageSize
      current
      records {
        entry_id
        key
        createdAt
        updatedAt
        public
        archive
        deleted
        mainLangText
        mainLang
        modifyRecords {
          record_id
          createdAt
          entryEntry_id
          prevLangs
          currLangs
          prevKey
          currKey
          creator
          creatorInfo {
            name
            user_id
            email
            nickName
            phone
            role
            avatar
          }
        }
        langs
      }
    }
  }
`

/**
 * __usePageAppEntriesQuery__
 *
 * To run a query within a React component, call `usePageAppEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageAppEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageAppEntriesQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNo: // value for 'pageNo'
 *      appId: // value for 'appId'
 *      archive: // value for 'archive'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      mainLangText: // value for 'mainLangText'
 *      latest: // value for 'latest'
 *      key: // value for 'key'
 *   },
 * });
 */
export function usePageAppEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    PageAppEntriesQuery,
    PageAppEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PageAppEntriesQuery, PageAppEntriesQueryVariables>(
    PageAppEntriesDocument,
    options,
  )
}
export function usePageAppEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageAppEntriesQuery,
    PageAppEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PageAppEntriesQuery, PageAppEntriesQueryVariables>(
    PageAppEntriesDocument,
    options,
  )
}
export type PageAppEntriesQueryHookResult = ReturnType<
  typeof usePageAppEntriesQuery
>
export type PageAppEntriesLazyQueryHookResult = ReturnType<
  typeof usePageAppEntriesLazyQuery
>
export type PageAppEntriesQueryResult = Apollo.QueryResult<
  PageAppEntriesQuery,
  PageAppEntriesQueryVariables
>
export const ChangeEntryAccessStatusDocument = gql`
  mutation ChangeEntryAccessStatus(
    $appId: Int!
    $entryId: Int!
    $archive: Boolean
    $deleted: Boolean
  ) {
    changeEntryAccessStatus(
      appId: $appId
      entryId: $entryId
      archive: $archive
      deleted: $deleted
    )
  }
`
export type ChangeEntryAccessStatusMutationFn = Apollo.MutationFunction<
  ChangeEntryAccessStatusMutation,
  ChangeEntryAccessStatusMutationVariables
>

/**
 * __useChangeEntryAccessStatusMutation__
 *
 * To run a mutation, you first call `useChangeEntryAccessStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEntryAccessStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEntryAccessStatusMutation, { data, loading, error }] = useChangeEntryAccessStatusMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      entryId: // value for 'entryId'
 *      archive: // value for 'archive'
 *      deleted: // value for 'deleted'
 *   },
 * });
 */
export function useChangeEntryAccessStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeEntryAccessStatusMutation,
    ChangeEntryAccessStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangeEntryAccessStatusMutation,
    ChangeEntryAccessStatusMutationVariables
  >(ChangeEntryAccessStatusDocument, options)
}
export type ChangeEntryAccessStatusMutationHookResult = ReturnType<
  typeof useChangeEntryAccessStatusMutation
>
export type ChangeEntryAccessStatusMutationResult =
  Apollo.MutationResult<ChangeEntryAccessStatusMutation>
export type ChangeEntryAccessStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeEntryAccessStatusMutation,
  ChangeEntryAccessStatusMutationVariables
>
