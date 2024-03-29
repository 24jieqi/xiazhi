import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetCurrentAppsQueryVariables = SchemaTypes.Exact<{
  name?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  type?: SchemaTypes.InputMaybe<SchemaTypes.AppTypeEnum>
  languages?: SchemaTypes.InputMaybe<Array<SchemaTypes.Scalars['String']>>
  access?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  push?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
}>

export type GetCurrentAppsQuery = {
  getCurrentApps?: {
    __typename?: 'AppPaging'
    total: number
    pageSize: number
    current: number
    records?: Array<{
      __typename?: 'AppItem'
      app_id?: number
      name?: string
      description?: string
      type?: SchemaTypes.AppTypeEnum
      languages?: Array<string>
      pictures?: Array<string>
      access?: boolean
      push?: boolean
      accessKey?: string
      creatorId?: number
      entryCount?: number
      role?: SchemaTypes.CollaboratorRoleEnum
      creator?: {
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
  }
}

export type CreateAppMutationVariables = SchemaTypes.Exact<{
  name: SchemaTypes.Scalars['String']
  description?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  type: SchemaTypes.AppTypeEnum
  languages: Array<SchemaTypes.Scalars['String']>
  pictures: Array<SchemaTypes.Scalars['String']>
}>

export type CreateAppMutation = { createApp?: number }

export type GetAppInfoByIdQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['Int']
}>

export type GetAppInfoByIdQuery = {
  getAppInfoById?: {
    __typename?: 'AppItem'
    app_id?: number
    name?: string
    description?: string
    type?: SchemaTypes.AppTypeEnum
    languages?: Array<string>
    pictures?: Array<string>
    access?: boolean
    push?: boolean
    accessKey?: string
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
      verifyType?: string
    }
  }
}

export type UpdateAppBasicInfoMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  description?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  type: SchemaTypes.AppTypeEnum
  pictures: Array<SchemaTypes.Scalars['String']>
}>

export type UpdateAppBasicInfoMutation = { updateAppBasicInfo?: number }

export type RefreshAccessKeyMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['Int']
}>

export type RefreshAccessKeyMutation = { refreshAccessKey?: string }

export type ChangeAccessStatusMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  access?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
  push?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Boolean']>
}>

export type ChangeAccessStatusMutation = { changeAccessStatus?: boolean }

export type ArchivedAppMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['Int']
}>

export type ArchivedAppMutation = { archivedApp?: boolean }

export type DeleteAppMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['Int']
}>

export type DeleteAppMutation = { deleteApp?: boolean }

export type GetAppCollaboratorsQueryVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
}>

export type GetAppCollaboratorsQuery = {
  getAppCollaborators?: Array<{
    __typename?: 'CollaborateInfo'
    assignedAt: number
    id: number
    role: SchemaTypes.CollaboratorRoleEnum
    user?: {
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
    app?: {
      __typename?: 'AppItem'
      app_id?: number
      name?: string
      description?: string
      type?: SchemaTypes.AppTypeEnum
      languages?: Array<string>
      pictures?: Array<string>
      access?: boolean
      push?: boolean
      accessKey?: string
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
        verifyType?: string
      }
    }
  }>
}

export type InviteCollaboratorsMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  userIdList: Array<SchemaTypes.CollaboratorsInput>
}>

export type InviteCollaboratorsMutation = { inviteCollaborators?: boolean }

export type RemoveCollaboratorsMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
  userIdList: Array<SchemaTypes.Scalars['Int']>
}>

export type RemoveCollaboratorsMutation = { removeCollaborators?: boolean }

export type GetAppCollaboratorsStatisticsQueryVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
}>

export type GetAppCollaboratorsStatisticsQuery = {
  getAppCollaboratorsStatistics?: Array<{
    __typename?: 'CollaboratorStatistics'
    userId: number
    addCount: number
    addCountToday: number
    modifyCount: number
  }>
}

export type GetAccessKeyByAppIdQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['Int']
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

export type DownloadAppXlsTemplateMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int']
}>

export type DownloadAppXlsTemplateMutation = { downloadAppXlsTemplate?: string }

export const GetCurrentAppsDocument = gql`
  query getCurrentApps(
    $name: String
    $type: AppTypeEnum
    $languages: [String!]
    $access: Boolean
    $push: Boolean
  ) {
    getCurrentApps(
      name: $name
      type: $type
      languages: $languages
      access: $access
      push: $push
    ) {
      total
      pageSize
      current
      records {
        app_id
        name
        description
        type
        languages
        pictures
        access
        push
        accessKey
        creatorId
        creator {
          name
          user_id
          email
          nickName
          phone
          role
          avatar
          verifyType
        }
        entryCount
        role
      }
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
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      languages: // value for 'languages'
 *      access: // value for 'access'
 *      push: // value for 'push'
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
  mutation createApp(
    $name: String!
    $description: String
    $type: AppTypeEnum!
    $languages: [String!]!
    $pictures: [String!]!
  ) {
    createApp(
      name: $name
      description: $description
      type: $type
      languages: $languages
      pictures: $pictures
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
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      languages: // value for 'languages'
 *      pictures: // value for 'pictures'
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
  query getAppInfoById($id: Int!) {
    getAppInfoById(id: $id) {
      app_id
      name
      description
      type
      languages
      pictures
      access
      push
      accessKey
      creatorId
      creator {
        name
        user_id
        email
        nickName
        phone
        role
        avatar
        verifyType
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
 *      id: // value for 'id'
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
  mutation updateAppBasicInfo(
    $appId: Int!
    $description: String
    $type: AppTypeEnum!
    $pictures: [String!]!
  ) {
    updateAppBasicInfo(
      appId: $appId
      description: $description
      type: $type
      pictures: $pictures
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
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      pictures: // value for 'pictures'
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
export const RefreshAccessKeyDocument = gql`
  mutation refreshAccessKey($id: Int!) {
    refreshAccessKey(id: $id)
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
 *      id: // value for 'id'
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
export const ChangeAccessStatusDocument = gql`
  mutation changeAccessStatus($appId: Int!, $access: Boolean, $push: Boolean) {
    changeAccessStatus(appId: $appId, access: $access, push: $push)
  }
`
export type ChangeAccessStatusMutationFn = Apollo.MutationFunction<
  ChangeAccessStatusMutation,
  ChangeAccessStatusMutationVariables
>

/**
 * __useChangeAccessStatusMutation__
 *
 * To run a mutation, you first call `useChangeAccessStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAccessStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAccessStatusMutation, { data, loading, error }] = useChangeAccessStatusMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      access: // value for 'access'
 *      push: // value for 'push'
 *   },
 * });
 */
export function useChangeAccessStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeAccessStatusMutation,
    ChangeAccessStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangeAccessStatusMutation,
    ChangeAccessStatusMutationVariables
  >(ChangeAccessStatusDocument, options)
}
export type ChangeAccessStatusMutationHookResult = ReturnType<
  typeof useChangeAccessStatusMutation
>
export type ChangeAccessStatusMutationResult =
  Apollo.MutationResult<ChangeAccessStatusMutation>
export type ChangeAccessStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeAccessStatusMutation,
  ChangeAccessStatusMutationVariables
>
export const ArchivedAppDocument = gql`
  mutation archivedApp($id: Int!) {
    archivedApp(id: $id)
  }
`
export type ArchivedAppMutationFn = Apollo.MutationFunction<
  ArchivedAppMutation,
  ArchivedAppMutationVariables
>

/**
 * __useArchivedAppMutation__
 *
 * To run a mutation, you first call `useArchivedAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivedAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivedAppMutation, { data, loading, error }] = useArchivedAppMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchivedAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchivedAppMutation,
    ArchivedAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ArchivedAppMutation, ArchivedAppMutationVariables>(
    ArchivedAppDocument,
    options,
  )
}
export type ArchivedAppMutationHookResult = ReturnType<
  typeof useArchivedAppMutation
>
export type ArchivedAppMutationResult =
  Apollo.MutationResult<ArchivedAppMutation>
export type ArchivedAppMutationOptions = Apollo.BaseMutationOptions<
  ArchivedAppMutation,
  ArchivedAppMutationVariables
>
export const DeleteAppDocument = gql`
  mutation deleteApp($id: Int!) {
    deleteApp(id: $id)
  }
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  DeleteAppMutation,
  DeleteAppMutationVariables
>

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppDocument,
    options,
  )
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  DeleteAppMutation,
  DeleteAppMutationVariables
>
export const GetAppCollaboratorsDocument = gql`
  query getAppCollaborators($appId: Int!) {
    getAppCollaborators(appId: $appId) {
      assignedAt
      id
      role
      user {
        name
        user_id
        email
        nickName
        phone
        role
        avatar
        verifyType
      }
      app {
        app_id
        name
        description
        type
        languages
        pictures
        access
        push
        accessKey
        creatorId
        creator {
          name
          user_id
          email
          nickName
          phone
          role
          avatar
          verifyType
        }
        entryCount
      }
    }
  }
`

/**
 * __useGetAppCollaboratorsQuery__
 *
 * To run a query within a React component, call `useGetAppCollaboratorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppCollaboratorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppCollaboratorsQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetAppCollaboratorsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAppCollaboratorsQuery,
    GetAppCollaboratorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetAppCollaboratorsQuery,
    GetAppCollaboratorsQueryVariables
  >(GetAppCollaboratorsDocument, options)
}
export function useGetAppCollaboratorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppCollaboratorsQuery,
    GetAppCollaboratorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAppCollaboratorsQuery,
    GetAppCollaboratorsQueryVariables
  >(GetAppCollaboratorsDocument, options)
}
export type GetAppCollaboratorsQueryHookResult = ReturnType<
  typeof useGetAppCollaboratorsQuery
>
export type GetAppCollaboratorsLazyQueryHookResult = ReturnType<
  typeof useGetAppCollaboratorsLazyQuery
>
export type GetAppCollaboratorsQueryResult = Apollo.QueryResult<
  GetAppCollaboratorsQuery,
  GetAppCollaboratorsQueryVariables
>
export const InviteCollaboratorsDocument = gql`
  mutation inviteCollaborators(
    $appId: Int!
    $userIdList: [CollaboratorsInput!]!
  ) {
    inviteCollaborators(appId: $appId, userIdList: $userIdList)
  }
`
export type InviteCollaboratorsMutationFn = Apollo.MutationFunction<
  InviteCollaboratorsMutation,
  InviteCollaboratorsMutationVariables
>

/**
 * __useInviteCollaboratorsMutation__
 *
 * To run a mutation, you first call `useInviteCollaboratorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteCollaboratorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteCollaboratorsMutation, { data, loading, error }] = useInviteCollaboratorsMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      userIdList: // value for 'userIdList'
 *   },
 * });
 */
export function useInviteCollaboratorsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteCollaboratorsMutation,
    InviteCollaboratorsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    InviteCollaboratorsMutation,
    InviteCollaboratorsMutationVariables
  >(InviteCollaboratorsDocument, options)
}
export type InviteCollaboratorsMutationHookResult = ReturnType<
  typeof useInviteCollaboratorsMutation
>
export type InviteCollaboratorsMutationResult =
  Apollo.MutationResult<InviteCollaboratorsMutation>
export type InviteCollaboratorsMutationOptions = Apollo.BaseMutationOptions<
  InviteCollaboratorsMutation,
  InviteCollaboratorsMutationVariables
>
export const RemoveCollaboratorsDocument = gql`
  mutation removeCollaborators($appId: Int!, $userIdList: [Int!]!) {
    removeCollaborators(appId: $appId, userIdList: $userIdList)
  }
`
export type RemoveCollaboratorsMutationFn = Apollo.MutationFunction<
  RemoveCollaboratorsMutation,
  RemoveCollaboratorsMutationVariables
>

/**
 * __useRemoveCollaboratorsMutation__
 *
 * To run a mutation, you first call `useRemoveCollaboratorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollaboratorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollaboratorsMutation, { data, loading, error }] = useRemoveCollaboratorsMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *      userIdList: // value for 'userIdList'
 *   },
 * });
 */
export function useRemoveCollaboratorsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCollaboratorsMutation,
    RemoveCollaboratorsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveCollaboratorsMutation,
    RemoveCollaboratorsMutationVariables
  >(RemoveCollaboratorsDocument, options)
}
export type RemoveCollaboratorsMutationHookResult = ReturnType<
  typeof useRemoveCollaboratorsMutation
>
export type RemoveCollaboratorsMutationResult =
  Apollo.MutationResult<RemoveCollaboratorsMutation>
export type RemoveCollaboratorsMutationOptions = Apollo.BaseMutationOptions<
  RemoveCollaboratorsMutation,
  RemoveCollaboratorsMutationVariables
>
export const GetAppCollaboratorsStatisticsDocument = gql`
  query getAppCollaboratorsStatistics($appId: Int!) {
    getAppCollaboratorsStatistics(appId: $appId) {
      userId
      addCount
      addCountToday
      modifyCount
    }
  }
`

/**
 * __useGetAppCollaboratorsStatisticsQuery__
 *
 * To run a query within a React component, call `useGetAppCollaboratorsStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppCollaboratorsStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppCollaboratorsStatisticsQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetAppCollaboratorsStatisticsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAppCollaboratorsStatisticsQuery,
    GetAppCollaboratorsStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetAppCollaboratorsStatisticsQuery,
    GetAppCollaboratorsStatisticsQueryVariables
  >(GetAppCollaboratorsStatisticsDocument, options)
}
export function useGetAppCollaboratorsStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppCollaboratorsStatisticsQuery,
    GetAppCollaboratorsStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetAppCollaboratorsStatisticsQuery,
    GetAppCollaboratorsStatisticsQueryVariables
  >(GetAppCollaboratorsStatisticsDocument, options)
}
export type GetAppCollaboratorsStatisticsQueryHookResult = ReturnType<
  typeof useGetAppCollaboratorsStatisticsQuery
>
export type GetAppCollaboratorsStatisticsLazyQueryHookResult = ReturnType<
  typeof useGetAppCollaboratorsStatisticsLazyQuery
>
export type GetAppCollaboratorsStatisticsQueryResult = Apollo.QueryResult<
  GetAppCollaboratorsStatisticsQuery,
  GetAppCollaboratorsStatisticsQueryVariables
>
export const GetAccessKeyByAppIdDocument = gql`
  query getAccessKeyByAppId($id: Int!) {
    getAccessKeyByAppId(id: $id) {
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
 *      id: // value for 'id'
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
export const DownloadAppXlsTemplateDocument = gql`
  mutation downloadAppXlsTemplate($appId: Int!) {
    downloadAppXlsTemplate(appId: $appId)
  }
`
export type DownloadAppXlsTemplateMutationFn = Apollo.MutationFunction<
  DownloadAppXlsTemplateMutation,
  DownloadAppXlsTemplateMutationVariables
>

/**
 * __useDownloadAppXlsTemplateMutation__
 *
 * To run a mutation, you first call `useDownloadAppXlsTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadAppXlsTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadAppXlsTemplateMutation, { data, loading, error }] = useDownloadAppXlsTemplateMutation({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useDownloadAppXlsTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DownloadAppXlsTemplateMutation,
    DownloadAppXlsTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DownloadAppXlsTemplateMutation,
    DownloadAppXlsTemplateMutationVariables
  >(DownloadAppXlsTemplateDocument, options)
}
export type DownloadAppXlsTemplateMutationHookResult = ReturnType<
  typeof useDownloadAppXlsTemplateMutation
>
export type DownloadAppXlsTemplateMutationResult =
  Apollo.MutationResult<DownloadAppXlsTemplateMutation>
export type DownloadAppXlsTemplateMutationOptions = Apollo.BaseMutationOptions<
  DownloadAppXlsTemplateMutation,
  DownloadAppXlsTemplateMutationVariables
>
