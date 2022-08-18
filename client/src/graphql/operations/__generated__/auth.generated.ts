import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type RegisterMutationVariables = SchemaTypes.Exact<{
  email: SchemaTypes.Scalars['String']
  password: SchemaTypes.Scalars['String']
}>

export type RegisterMutation = { register?: string }

export type LoginMutationVariables = SchemaTypes.Exact<{
  email: SchemaTypes.Scalars['String']
  password: SchemaTypes.Scalars['String']
}>

export type LoginMutation = { login?: string }

export type UpdateUserInfoMutationVariables = SchemaTypes.Exact<{
  name?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  phone?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  nickName?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  role?: SchemaTypes.InputMaybe<SchemaTypes.UserRoleEnum>
  avatar?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
}>

export type UpdateUserInfoMutation = { updateUserInfo?: boolean }

export type GetCurrentUserQueryVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type GetCurrentUserQuery = {
  getCurrentUser?: {
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

export type SendVerifyEmailMutationVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type SendVerifyEmailMutation = { sendVerifyEmail?: boolean }

export type VerifyEmailMutationVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type VerifyEmailMutation = { verifyEmail?: string }

export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const UpdateUserInfoDocument = gql`
  mutation UpdateUserInfo(
    $name: String
    $phone: String
    $nickName: String
    $role: UserRoleEnum
    $avatar: String
  ) {
    updateUserInfo(
      name: $name
      phone: $phone
      nickName: $nickName
      role: $role
      avatar: $avatar
    )
  }
`
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      nickName: // value for 'nickName'
 *      role: // value for 'role'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >(UpdateUserInfoDocument, options)
}
export type UpdateUserInfoMutationHookResult = ReturnType<
  typeof useUpdateUserInfoMutation
>
export type UpdateUserInfoMutationResult =
  Apollo.MutationResult<UpdateUserInfoMutation>
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    getCurrentUser {
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
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options,
  )
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options,
  )
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>
export const SendVerifyEmailDocument = gql`
  mutation SendVerifyEmail {
    sendVerifyEmail
  }
`
export type SendVerifyEmailMutationFn = Apollo.MutationFunction<
  SendVerifyEmailMutation,
  SendVerifyEmailMutationVariables
>

/**
 * __useSendVerifyEmailMutation__
 *
 * To run a mutation, you first call `useSendVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerifyEmailMutation, { data, loading, error }] = useSendVerifyEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendVerifyEmailMutation,
    SendVerifyEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SendVerifyEmailMutation,
    SendVerifyEmailMutationVariables
  >(SendVerifyEmailDocument, options)
}
export type SendVerifyEmailMutationHookResult = ReturnType<
  typeof useSendVerifyEmailMutation
>
export type SendVerifyEmailMutationResult =
  Apollo.MutationResult<SendVerifyEmailMutation>
export type SendVerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  SendVerifyEmailMutation,
  SendVerifyEmailMutationVariables
>
export const VerifyEmailDocument = gql`
  mutation VerifyEmail {
    verifyEmail
  }
`
export type VerifyEmailMutationFn = Apollo.MutationFunction<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
    VerifyEmailDocument,
    options,
  )
}
export type VerifyEmailMutationHookResult = ReturnType<
  typeof useVerifyEmailMutation
>
export type VerifyEmailMutationResult =
  Apollo.MutationResult<VerifyEmailMutation>
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
>
