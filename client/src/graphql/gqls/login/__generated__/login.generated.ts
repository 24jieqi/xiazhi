import type * as SchemaTypes from '../../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type LoginMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.LoginInput>
}>

export type LoginMutation = {
  login?: SchemaTypes.Maybe<{ needUpdatePassword?: SchemaTypes.Maybe<boolean>; token?: SchemaTypes.Maybe<string> }>
}

export type GetPermissionQueryVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.GetPermissionInput>
}>

export type GetPermissionQuery = { getPermission?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<string>>> }

export const LoginDocument = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      needUpdatePassword
      token
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const GetPermissionDocument = gql`
  query getPermission($input: GetPermissionInput) {
    getPermission(input: $input)
  }
`

/**
 * __useGetPermissionQuery__
 *
 * To run a query within a React component, call `useGetPermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPermissionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPermissionQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPermissionQuery, GetPermissionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPermissionQuery, GetPermissionQueryVariables>(GetPermissionDocument, options)
}
export function useGetPermissionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPermissionQuery, GetPermissionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPermissionQuery, GetPermissionQueryVariables>(GetPermissionDocument, options)
}
export type GetPermissionQueryHookResult = ReturnType<typeof useGetPermissionQuery>
export type GetPermissionLazyQueryHookResult = ReturnType<typeof useGetPermissionLazyQuery>
export type GetPermissionQueryResult = Apollo.QueryResult<GetPermissionQuery, GetPermissionQueryVariables>
