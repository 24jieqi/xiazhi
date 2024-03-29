import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type PageAllPublicEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  mainLangText?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  startTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
  endTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
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
      creatorId?: number
      createdAt?: number
      updatedAt?: number
      archive?: boolean
      deleted?: boolean
      mainLangText?: string
      mainLang?: string
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
          verifyType?: string
        }
      }>
    }>
  }
}

export type CreateEntryMutationVariables = SchemaTypes.Exact<{
  appId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  langs: SchemaTypes.Scalars['JSONObject']
  key: SchemaTypes.Scalars['String']
}>

export type CreateEntryMutation = { createEntry?: number }

export type UpdateEntryMutationVariables = SchemaTypes.Exact<{
  entryId: SchemaTypes.Scalars['Int']
  appId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSONObject']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type UpdateEntryMutation = { updateEntry?: boolean }

export type PageAppEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
  appId: SchemaTypes.Scalars['Int']
  startTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
  endTime?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Float']>
  mainLangText?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  latest?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  archive?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
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
      creatorId?: number
      createdAt?: number
      updatedAt?: number
      archive?: boolean
      deleted?: boolean
      mainLangText?: string
      mainLang?: string
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
          verifyType?: string
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

export type DeleteEntriesMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  entryIds: Array<SchemaTypes.Scalars['Int']>
}>

export type DeleteEntriesMutation = { deleteEntries?: boolean }

export type ValidEntryKeyQueryVariables = SchemaTypes.Exact<{
  appId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  entryId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type ValidEntryKeyQuery = { validEntryKey?: boolean }

export type UploadEntriesXlsxMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  fileUrl: SchemaTypes.Scalars['String']
}>

export type UploadEntriesXlsxMutation = { uploadEntriesXlsx?: boolean }

export type TransformEntryMutationVariables = SchemaTypes.Exact<{
  entryId: SchemaTypes.Scalars['Int']
  targetAppId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
}>

export type TransformEntryMutation = { transformEntry?: boolean }

export type QueryPublicEntryByMainTextQueryVariables = SchemaTypes.Exact<{
  mainText: SchemaTypes.Scalars['String']
}>

export type QueryPublicEntryByMainTextQuery = {
  queryPublicEntryByMainText?: {
    __typename?: 'EntryItem'
    entry_id?: number
    key?: string
    creatorId?: number
    createdAt?: number
    updatedAt?: number
    archive?: boolean
    deleted?: boolean
    mainLangText?: string
    mainLang?: string
    langs?: any
  }
}

export type PagePublicEntriesByAppQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int']
  pageNo: SchemaTypes.Scalars['Int']
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  mainLangText?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  appId: SchemaTypes.Scalars['Int']
}>

export type PagePublicEntriesByAppQuery = {
  pagePublicEntriesByApp?: {
    __typename?: 'EntryPaging'
    total: number
    pageSize: number
    current: number
    records?: Array<{
      __typename?: 'EntryItem'
      entry_id?: number
      key?: string
      creatorId?: number
      createdAt?: number
      updatedAt?: number
      archive?: boolean
      deleted?: boolean
      mainLangText?: string
      mainLang?: string
      appId?: number
      langs?: any
      existInApp?: boolean
      lastContributor?: {
        __typename?: 'UserInfo'
        name?: string
        user_id?: number
        email?: string
        nickName?: string
        phone?: string
        role?: SchemaTypes.UserRoleEnum
        avatar?: string
        verifyType?: string
      }
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
          verifyType?: string
        }
      }>
    }>
  }
}

export type TransformEntryForAppMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  entryIds: Array<SchemaTypes.Scalars['Int']>
}>

export type TransformEntryForAppMutation = { transformEntryForApp?: boolean }

export const PageAllPublicEntriesDocument = gql`
  query pageAllPublicEntries(
    $pageSize: Int!
    $pageNo: Int!
    $key: String
    $mainLangText: String
    $startTime: Float
    $endTime: Float
  ) {
    pageAllPublicEntries(
      pageSize: $pageSize
      pageNo: $pageNo
      key: $key
      mainLangText: $mainLangText
      startTime: $startTime
      endTime: $endTime
    ) {
      total
      pageSize
      current
      records {
        entry_id
        key
        creatorId
        createdAt
        updatedAt
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
            verifyType
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
 *      key: // value for 'key'
 *      mainLangText: // value for 'mainLangText'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
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
  mutation createEntry($appId: Int, $langs: JSONObject!, $key: String!) {
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
  mutation updateEntry(
    $entryId: Int!
    $appId: Int
    $langs: JSONObject
    $key: String
  ) {
    updateEntry(entryId: $entryId, appId: $appId, langs: $langs, key: $key)
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
 *      appId: // value for 'appId'
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
  query pageAppEntries(
    $pageSize: Int!
    $pageNo: Int!
    $appId: Int!
    $startTime: Float
    $endTime: Float
    $mainLangText: String
    $latest: Boolean
    $key: String
    $archive: Boolean
  ) {
    pageAppEntries(
      pageSize: $pageSize
      pageNo: $pageNo
      appId: $appId
      startTime: $startTime
      endTime: $endTime
      mainLangText: $mainLangText
      latest: $latest
      key: $key
      archive: $archive
    ) {
      total
      pageSize
      current
      records {
        entry_id
        key
        creatorId
        createdAt
        updatedAt
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
            verifyType
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
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      mainLangText: // value for 'mainLangText'
 *      latest: // value for 'latest'
 *      key: // value for 'key'
 *      archive: // value for 'archive'
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
  mutation changeEntryAccessStatus(
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
export const DeleteEntriesDocument = gql`
  mutation deleteEntries($appId: Int!, $entryIds: [Int!]!) {
    deleteEntries(appId: $appId, entryIds: $entryIds)
  }
`
export type DeleteEntriesMutationFn = Apollo.MutationFunction<
  DeleteEntriesMutation,
  DeleteEntriesMutationVariables
>

/**
 * __useDeleteEntriesMutation__
 *
 * To run a mutation, you first call `useDeleteEntriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntriesMutation, { data, loading, error }] = useDeleteEntriesMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      entryIds: // value for 'entryIds'
 *   },
 * });
 */
export function useDeleteEntriesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEntriesMutation,
    DeleteEntriesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteEntriesMutation,
    DeleteEntriesMutationVariables
  >(DeleteEntriesDocument, options)
}
export type DeleteEntriesMutationHookResult = ReturnType<
  typeof useDeleteEntriesMutation
>
export type DeleteEntriesMutationResult =
  Apollo.MutationResult<DeleteEntriesMutation>
export type DeleteEntriesMutationOptions = Apollo.BaseMutationOptions<
  DeleteEntriesMutation,
  DeleteEntriesMutationVariables
>
export const ValidEntryKeyDocument = gql`
  query validEntryKey($appId: Int, $entryId: Int, $key: String) {
    validEntryKey(appId: $appId, entryId: $entryId, key: $key)
  }
`

/**
 * __useValidEntryKeyQuery__
 *
 * To run a query within a React component, call `useValidEntryKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidEntryKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidEntryKeyQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *      entryId: // value for 'entryId'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useValidEntryKeyQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ValidEntryKeyQuery,
    ValidEntryKeyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ValidEntryKeyQuery, ValidEntryKeyQueryVariables>(
    ValidEntryKeyDocument,
    options,
  )
}
export function useValidEntryKeyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidEntryKeyQuery,
    ValidEntryKeyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ValidEntryKeyQuery, ValidEntryKeyQueryVariables>(
    ValidEntryKeyDocument,
    options,
  )
}
export type ValidEntryKeyQueryHookResult = ReturnType<
  typeof useValidEntryKeyQuery
>
export type ValidEntryKeyLazyQueryHookResult = ReturnType<
  typeof useValidEntryKeyLazyQuery
>
export type ValidEntryKeyQueryResult = Apollo.QueryResult<
  ValidEntryKeyQuery,
  ValidEntryKeyQueryVariables
>
export const UploadEntriesXlsxDocument = gql`
  mutation uploadEntriesXlsx($appId: Int!, $fileUrl: String!) {
    uploadEntriesXlsx(appId: $appId, fileUrl: $fileUrl)
  }
`
export type UploadEntriesXlsxMutationFn = Apollo.MutationFunction<
  UploadEntriesXlsxMutation,
  UploadEntriesXlsxMutationVariables
>

/**
 * __useUploadEntriesXlsxMutation__
 *
 * To run a mutation, you first call `useUploadEntriesXlsxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadEntriesXlsxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadEntriesXlsxMutation, { data, loading, error }] = useUploadEntriesXlsxMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      fileUrl: // value for 'fileUrl'
 *   },
 * });
 */
export function useUploadEntriesXlsxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadEntriesXlsxMutation,
    UploadEntriesXlsxMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UploadEntriesXlsxMutation,
    UploadEntriesXlsxMutationVariables
  >(UploadEntriesXlsxDocument, options)
}
export type UploadEntriesXlsxMutationHookResult = ReturnType<
  typeof useUploadEntriesXlsxMutation
>
export type UploadEntriesXlsxMutationResult =
  Apollo.MutationResult<UploadEntriesXlsxMutation>
export type UploadEntriesXlsxMutationOptions = Apollo.BaseMutationOptions<
  UploadEntriesXlsxMutation,
  UploadEntriesXlsxMutationVariables
>
export const TransformEntryDocument = gql`
  mutation transformEntry($entryId: Int!, $targetAppId: Int) {
    transformEntry(entryId: $entryId, targetAppId: $targetAppId)
  }
`
export type TransformEntryMutationFn = Apollo.MutationFunction<
  TransformEntryMutation,
  TransformEntryMutationVariables
>

/**
 * __useTransformEntryMutation__
 *
 * To run a mutation, you first call `useTransformEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransformEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transformEntryMutation, { data, loading, error }] = useTransformEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *      targetAppId: // value for 'targetAppId'
 *   },
 * });
 */
export function useTransformEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TransformEntryMutation,
    TransformEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TransformEntryMutation,
    TransformEntryMutationVariables
  >(TransformEntryDocument, options)
}
export type TransformEntryMutationHookResult = ReturnType<
  typeof useTransformEntryMutation
>
export type TransformEntryMutationResult =
  Apollo.MutationResult<TransformEntryMutation>
export type TransformEntryMutationOptions = Apollo.BaseMutationOptions<
  TransformEntryMutation,
  TransformEntryMutationVariables
>
export const QueryPublicEntryByMainTextDocument = gql`
  query queryPublicEntryByMainText($mainText: String!) {
    queryPublicEntryByMainText(mainText: $mainText) {
      entry_id
      key
      creatorId
      createdAt
      updatedAt
      archive
      deleted
      mainLangText
      mainLang
      langs
    }
  }
`

/**
 * __useQueryPublicEntryByMainTextQuery__
 *
 * To run a query within a React component, call `useQueryPublicEntryByMainTextQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryPublicEntryByMainTextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryPublicEntryByMainTextQuery({
 *   variables: {
 *      mainText: // value for 'mainText'
 *   },
 * });
 */
export function useQueryPublicEntryByMainTextQuery(
  baseOptions: Apollo.QueryHookOptions<
    QueryPublicEntryByMainTextQuery,
    QueryPublicEntryByMainTextQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    QueryPublicEntryByMainTextQuery,
    QueryPublicEntryByMainTextQueryVariables
  >(QueryPublicEntryByMainTextDocument, options)
}
export function useQueryPublicEntryByMainTextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryPublicEntryByMainTextQuery,
    QueryPublicEntryByMainTextQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    QueryPublicEntryByMainTextQuery,
    QueryPublicEntryByMainTextQueryVariables
  >(QueryPublicEntryByMainTextDocument, options)
}
export type QueryPublicEntryByMainTextQueryHookResult = ReturnType<
  typeof useQueryPublicEntryByMainTextQuery
>
export type QueryPublicEntryByMainTextLazyQueryHookResult = ReturnType<
  typeof useQueryPublicEntryByMainTextLazyQuery
>
export type QueryPublicEntryByMainTextQueryResult = Apollo.QueryResult<
  QueryPublicEntryByMainTextQuery,
  QueryPublicEntryByMainTextQueryVariables
>
export const PagePublicEntriesByAppDocument = gql`
  query pagePublicEntriesByApp(
    $pageSize: Int!
    $pageNo: Int!
    $key: String
    $mainLangText: String
    $appId: Int!
  ) {
    pagePublicEntriesByApp(
      pageSize: $pageSize
      pageNo: $pageNo
      key: $key
      mainLangText: $mainLangText
    ) {
      total
      pageSize
      current
      records {
        entry_id
        key
        creatorId
        createdAt
        updatedAt
        archive
        deleted
        mainLangText
        mainLang
        appId
        lastContributor {
          name
          user_id
          email
          nickName
          phone
          role
          avatar
          verifyType
        }
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
            verifyType
          }
        }
        langs
        existInApp(appId: $appId)
      }
    }
  }
`

/**
 * __usePagePublicEntriesByAppQuery__
 *
 * To run a query within a React component, call `usePagePublicEntriesByAppQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagePublicEntriesByAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagePublicEntriesByAppQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNo: // value for 'pageNo'
 *      key: // value for 'key'
 *      mainLangText: // value for 'mainLangText'
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function usePagePublicEntriesByAppQuery(
  baseOptions: Apollo.QueryHookOptions<
    PagePublicEntriesByAppQuery,
    PagePublicEntriesByAppQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    PagePublicEntriesByAppQuery,
    PagePublicEntriesByAppQueryVariables
  >(PagePublicEntriesByAppDocument, options)
}
export function usePagePublicEntriesByAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PagePublicEntriesByAppQuery,
    PagePublicEntriesByAppQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    PagePublicEntriesByAppQuery,
    PagePublicEntriesByAppQueryVariables
  >(PagePublicEntriesByAppDocument, options)
}
export type PagePublicEntriesByAppQueryHookResult = ReturnType<
  typeof usePagePublicEntriesByAppQuery
>
export type PagePublicEntriesByAppLazyQueryHookResult = ReturnType<
  typeof usePagePublicEntriesByAppLazyQuery
>
export type PagePublicEntriesByAppQueryResult = Apollo.QueryResult<
  PagePublicEntriesByAppQuery,
  PagePublicEntriesByAppQueryVariables
>
export const TransformEntryForAppDocument = gql`
  mutation transformEntryForApp($appId: Int!, $entryIds: [Int!]!) {
    transformEntryForApp(appId: $appId, entryIds: $entryIds)
  }
`
export type TransformEntryForAppMutationFn = Apollo.MutationFunction<
  TransformEntryForAppMutation,
  TransformEntryForAppMutationVariables
>

/**
 * __useTransformEntryForAppMutation__
 *
 * To run a mutation, you first call `useTransformEntryForAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransformEntryForAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transformEntryForAppMutation, { data, loading, error }] = useTransformEntryForAppMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      entryIds: // value for 'entryIds'
 *   },
 * });
 */
export function useTransformEntryForAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TransformEntryForAppMutation,
    TransformEntryForAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TransformEntryForAppMutation,
    TransformEntryForAppMutationVariables
  >(TransformEntryForAppDocument, options)
}
export type TransformEntryForAppMutationHookResult = ReturnType<
  typeof useTransformEntryForAppMutation
>
export type TransformEntryForAppMutationResult =
  Apollo.MutationResult<TransformEntryForAppMutation>
export type TransformEntryForAppMutationOptions = Apollo.BaseMutationOptions<
  TransformEntryForAppMutation,
  TransformEntryForAppMutationVariables
>
