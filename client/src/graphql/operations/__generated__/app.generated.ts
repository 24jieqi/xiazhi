import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetCurrentAppsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type GetCurrentAppsQuery = {
  getCurrentApps?: Array<{
    __typename?: 'AppItem'
    app_id?: number
    name?: string
    description?: string
    type?: SchemaTypes.AppTypeEnum
    languages?: Array<SchemaTypes.LanguageTypeEnum>
    pictures?: Array<string>
    access?: boolean
    push?: boolean
    creatorId?: number
    entryCount?: number
    creator?: {
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
}

export type CreateAppMutationVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']
  type: SchemaTypes.AppTypeEnum
  languages: Array<SchemaTypes.LanguageTypeEnum>
  pictures: Array<SchemaTypes.Scalars['String']>
  description?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type CreateAppMutation = { createApp?: number }

export type GetAppInfoByIdQueryVariables = SchemaTypes.Exact<{
  getAppInfoByIdId: SchemaTypes.Scalars['Int']
}>

export type GetAppInfoByIdQuery = {
  getAppInfoById?: {
    __typename?: 'AppItem'
    app_id?: number
    name?: string
    description?: string
    type?: SchemaTypes.AppTypeEnum
    languages?: Array<SchemaTypes.LanguageTypeEnum>
    pictures?: Array<string>
    access?: boolean
    push?: boolean
    creatorId?: number
    entryCount?: number
    creator?: {
      __typename?: 'UserInfo'
      name?: string
      user_id?: number
      email?: string
      nickName?: string
      phone?: string
      role?: SchemaTypes.UserRoleEnum
      avatar?: string
    }
  }
}

export type UpdateAppBasicInfoMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  type: SchemaTypes.AppTypeEnum
  pictures: Array<SchemaTypes.Scalars['String']>
  description?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type UpdateAppBasicInfoMutation = { updateAppBasicInfo?: number }

export type GetAccessKeyByAppIdQueryVariables = SchemaTypes.Exact<{
  getAccessKeyByAppIdId: SchemaTypes.Scalars['Int']
}>

export type GetAccessKeyByAppIdQuery = {
  getAccessKeyByAppId?: {
    __typename?: 'AppAccessInfo'
    app_id: number
    name?: string
    deleted?: boolean
    archived?: boolean
    push?: boolean
    access?: boolean
    accessKey?: string
  }
}

export type RefreshAccessKeyMutationVariables = SchemaTypes.Exact<{
  refreshAccessKeyId: SchemaTypes.Scalars['Int']
}>

export type RefreshAccessKeyMutation = { refreshAccessKey?: string }

export const GetCurrentAppsDocument = gql`
  query GetCurrentApps {
    getCurrentApps {
      app_id
      name
      description
      type
      languages
      pictures
      access
      push
      creatorId
      creator {
        name
        user_id
        email
        nickName
        phone
        role
        avatar
      }
      entryCount
    }
  }
`

/**
 * __useGetCurrentAppsQuery__
 *
 * To run a query within a React component, call `useGetCurrentAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentAppsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentAppsQuery,
    GetCurrentAppsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>(
    GetCurrentAppsDocument,
    options,
  )
}
export function useGetCurrentAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentAppsQuery,
    GetCurrentAppsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>(
    GetCurrentAppsDocument,
    options,
  )
}
export type GetCurrentAppsQueryHookResult = ReturnType<
  typeof useGetCurrentAppsQuery
>
export type GetCurrentAppsLazyQueryHookResult = ReturnType<
  typeof useGetCurrentAppsLazyQuery
>
export type GetCurrentAppsQueryResult = Apollo.QueryResult<
  GetCurrentAppsQuery,
  GetCurrentAppsQueryVariables
>
export const CreateAppDocument = gql`
  mutation CreateApp(
    $name: String!
    $type: AppTypeEnum!
    $languages: [LanguageTypeEnum!]!
    $pictures: [String!]!
    $description: String
  ) {
    createApp(
      name: $name
      type: $type
      languages: $languages
      pictures: $pictures
      description: $description
    )
  }
`
export type CreateAppMutationFn = Apollo.MutationFunction<
  CreateAppMutation,
  CreateAppMutationVariables
>

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      languages: // value for 'languages'
 *      pictures: // value for 'pictures'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAppMutation,
    CreateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(
    CreateAppDocument,
    options,
  )
}
export type CreateAppMutationHookResult = ReturnType<
  typeof useCreateAppMutation
>
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<
  CreateAppMutation,
  CreateAppMutationVariables
>
export const GetAppInfoByIdDocument = gql`
  query GetAppInfoById($getAppInfoByIdId: Int!) {
    getAppInfoById(id: $getAppInfoByIdId) {
      app_id
      name
      description
      type
      languages
      pictures
      access
      push
      creatorId
      creator {
        name
        user_id
        email
        nickName
        phone
        role
        avatar
      }
      entryCount
    }
  }
`

/**
 * __useGetAppInfoByIdQuery__
 *
 * To run a query within a React component, call `useGetAppInfoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppInfoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppInfoByIdQuery({
 *   variables: {
 *      getAppInfoByIdId: // value for 'getAppInfoByIdId'
 *   },
 * });
 */
export function useGetAppInfoByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAppInfoByIdQuery,
    GetAppInfoByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppInfoByIdQuery, GetAppInfoByIdQueryVariables>(
    GetAppInfoByIdDocument,
    options,
  )
}
export function useGetAppInfoByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppInfoByIdQuery,
    GetAppInfoByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppInfoByIdQuery, GetAppInfoByIdQueryVariables>(
    GetAppInfoByIdDocument,
    options,
  )
}
export type GetAppInfoByIdQueryHookResult = ReturnType<
  typeof useGetAppInfoByIdQuery
>
export type GetAppInfoByIdLazyQueryHookResult = ReturnType<
  typeof useGetAppInfoByIdLazyQuery
>
export type GetAppInfoByIdQueryResult = Apollo.QueryResult<
  GetAppInfoByIdQuery,
  GetAppInfoByIdQueryVariables
>
export const UpdateAppBasicInfoDocument = gql`
  mutation UpdateAppBasicInfo(
    $appId: Int!
    $type: AppTypeEnum!
    $pictures: [String!]!
    $description: String
  ) {
    updateAppBasicInfo(
      appId: $appId
      type: $type
      pictures: $pictures
      description: $description
    )
  }
`
export type UpdateAppBasicInfoMutationFn = Apollo.MutationFunction<
  UpdateAppBasicInfoMutation,
  UpdateAppBasicInfoMutationVariables
>

/**
 * __useUpdateAppBasicInfoMutation__
 *
 * To run a mutation, you first call `useUpdateAppBasicInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppBasicInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppBasicInfoMutation, { data, loading, error }] = useUpdateAppBasicInfoMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      type: // value for 'type'
 *      pictures: // value for 'pictures'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateAppBasicInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAppBasicInfoMutation,
    UpdateAppBasicInfoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateAppBasicInfoMutation,
    UpdateAppBasicInfoMutationVariables
  >(UpdateAppBasicInfoDocument, options)
}
export type UpdateAppBasicInfoMutationHookResult = ReturnType<
  typeof useUpdateAppBasicInfoMutation
>
export type UpdateAppBasicInfoMutationResult =
  Apollo.MutationResult<UpdateAppBasicInfoMutation>
export type UpdateAppBasicInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateAppBasicInfoMutation,
  UpdateAppBasicInfoMutationVariables
>
export const GetAccessKeyByAppIdDocument = gql`
  query GetAccessKeyByAppId($getAccessKeyByAppIdId: Int!) {
    getAccessKeyByAppId(id: $getAccessKeyByAppIdId) {
      app_id
      name
      deleted
      archived
      push
      access
      accessKey
    }
  }
`

/**
 * __useGetAccessKeyByAppIdQuery__
 *
 * To run a query within a React component, call `useGetAccessKeyByAppIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccessKeyByAppIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccessKeyByAppIdQuery({
 *   variables: {
 *      getAccessKeyByAppIdId: // value for 'getAccessKeyByAppIdId'
 *   },
 * });
 */
export function useGetAccessKeyByAppIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAccessKeyByAppIdQuery,
    GetAccessKeyByAppIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetAccessKeyByAppIdQuery,
    GetAccessKeyByAppIdQueryVariables
  >(GetAccessKeyByAppIdDocument, options)
}
export function useGetAccessKeyByAppIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAccessKeyByAppIdQuery,
    GetAccessKeyByAppIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAccessKeyByAppIdQuery,
    GetAccessKeyByAppIdQueryVariables
  >(GetAccessKeyByAppIdDocument, options)
}
export type GetAccessKeyByAppIdQueryHookResult = ReturnType<
  typeof useGetAccessKeyByAppIdQuery
>
export type GetAccessKeyByAppIdLazyQueryHookResult = ReturnType<
  typeof useGetAccessKeyByAppIdLazyQuery
>
export type GetAccessKeyByAppIdQueryResult = Apollo.QueryResult<
  GetAccessKeyByAppIdQuery,
  GetAccessKeyByAppIdQueryVariables
>
export const RefreshAccessKeyDocument = gql`
  mutation RefreshAccessKey($refreshAccessKeyId: Int!) {
    refreshAccessKey(id: $refreshAccessKeyId)
  }
`
export type RefreshAccessKeyMutationFn = Apollo.MutationFunction<
  RefreshAccessKeyMutation,
  RefreshAccessKeyMutationVariables
>

/**
 * __useRefreshAccessKeyMutation__
 *
 * To run a mutation, you first call `useRefreshAccessKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessKeyMutation, { data, loading, error }] = useRefreshAccessKeyMutation({
 *   variables: {
 *      refreshAccessKeyId: // value for 'refreshAccessKeyId'
 *   },
 * });
 */
export function useRefreshAccessKeyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshAccessKeyMutation,
    RefreshAccessKeyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RefreshAccessKeyMutation,
    RefreshAccessKeyMutationVariables
  >(RefreshAccessKeyDocument, options)
}
export type RefreshAccessKeyMutationHookResult = ReturnType<
  typeof useRefreshAccessKeyMutation
>
export type RefreshAccessKeyMutationResult =
  Apollo.MutationResult<RefreshAccessKeyMutation>
export type RefreshAccessKeyMutationOptions = Apollo.BaseMutationOptions<
  RefreshAccessKeyMutation,
  RefreshAccessKeyMutationVariables
>
