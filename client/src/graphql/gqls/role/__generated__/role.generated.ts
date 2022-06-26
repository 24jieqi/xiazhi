import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import type * as SchemaTypes from '../../../generated/types'
const defaultOptions = {}
export type GetUserQueryVariables = SchemaTypes.Exact<{
  id?: SchemaTypes.Maybe<SchemaTypes.Scalars['Int']>
}>

export type GetUserQuery = {
  getUser?: SchemaTypes.Maybe<{
    id?: SchemaTypes.Maybe<number>
    userAccount?: SchemaTypes.Maybe<string>
    userName?: SchemaTypes.Maybe<string>
    phone?: SchemaTypes.Maybe<string>
    status?: SchemaTypes.Maybe<number>
    isAdmin?: SchemaTypes.Maybe<number>
    receiveMsg?: SchemaTypes.Maybe<number>
    roleIds?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<number>>>
    roleNames?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<string>>>
    departIds?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<number>>>
    orgNames?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<string>>>
  }>
}

export type ResetPasswordMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.ResetPasswordInput>
}>

export type ResetPasswordMutation = { resetPassword?: SchemaTypes.Maybe<boolean> }

export type UpdatePasswordMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.UpdatePasswordInput>
}>

export type UpdatePasswordMutation = { updatePassword?: SchemaTypes.Maybe<boolean> }

export const GetUserDocument = gql`
  query getUser($id: Int) {
    getUser(id: $id) {
      id
      userAccount
      userName
      phone
      status
      isAdmin
      receiveMsg
      roleIds
      roleNames
      departIds
      orgNames
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const ResetPasswordDocument = gql`
  mutation resetPassword($input: ResetPasswordInput) {
    resetPassword(input: $input)
  }
`
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
export const UpdatePasswordDocument = gql`
  mutation updatePassword($input: UpdatePasswordInput) {
    updatePassword(input: $input)
  }
`
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options)
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>
