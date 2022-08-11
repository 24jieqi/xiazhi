import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type ListSupportLanguageQueryVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type ListSupportLanguageQuery = {
  listSupportLanguage?: Array<{
    __typename?: 'LangageTypeOption'
    label: string
    value?: SchemaTypes.LanguageTypeEnum
  }>
}

export type ListUserFuzzyByUserNameQueryVariables = SchemaTypes.Exact<{
  keywords: SchemaTypes.Scalars['String']
}>

export type ListUserFuzzyByUserNameQuery = {
  listUserFuzzyByUserName?: Array<{
    __typename?: 'UserInfo'
    name?: string
    user_id?: number
    email?: string
  }>
}

export const ListSupportLanguageDocument = gql`
  query ListSupportLanguage {
    listSupportLanguage {
      label
      value
    }
  }
`

/**
 * __useListSupportLanguageQuery__
 *
 * To run a query within a React component, call `useListSupportLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSupportLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSupportLanguageQuery({
 *   variables: {
 *   },
 * });
 */
export function useListSupportLanguageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListSupportLanguageQuery,
    ListSupportLanguageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ListSupportLanguageQuery,
    ListSupportLanguageQueryVariables
  >(ListSupportLanguageDocument, options)
}
export function useListSupportLanguageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListSupportLanguageQuery,
    ListSupportLanguageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ListSupportLanguageQuery,
    ListSupportLanguageQueryVariables
  >(ListSupportLanguageDocument, options)
}
export type ListSupportLanguageQueryHookResult = ReturnType<
  typeof useListSupportLanguageQuery
>
export type ListSupportLanguageLazyQueryHookResult = ReturnType<
  typeof useListSupportLanguageLazyQuery
>
export type ListSupportLanguageQueryResult = Apollo.QueryResult<
  ListSupportLanguageQuery,
  ListSupportLanguageQueryVariables
>
export const ListUserFuzzyByUserNameDocument = gql`
  query ListUserFuzzyByUserName($keywords: String!) {
    listUserFuzzyByUserName(keywords: $keywords) {
      name
      user_id
      email
    }
  }
`

/**
 * __useListUserFuzzyByUserNameQuery__
 *
 * To run a query within a React component, call `useListUserFuzzyByUserNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserFuzzyByUserNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserFuzzyByUserNameQuery({
 *   variables: {
 *      keywords: // value for 'keywords'
 *   },
 * });
 */
export function useListUserFuzzyByUserNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListUserFuzzyByUserNameQuery,
    ListUserFuzzyByUserNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ListUserFuzzyByUserNameQuery,
    ListUserFuzzyByUserNameQueryVariables
  >(ListUserFuzzyByUserNameDocument, options)
}
export function useListUserFuzzyByUserNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListUserFuzzyByUserNameQuery,
    ListUserFuzzyByUserNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ListUserFuzzyByUserNameQuery,
    ListUserFuzzyByUserNameQueryVariables
  >(ListUserFuzzyByUserNameDocument, options)
}
export type ListUserFuzzyByUserNameQueryHookResult = ReturnType<
  typeof useListUserFuzzyByUserNameQuery
>
export type ListUserFuzzyByUserNameLazyQueryHookResult = ReturnType<
  typeof useListUserFuzzyByUserNameLazyQuery
>
export type ListUserFuzzyByUserNameQueryResult = Apollo.QueryResult<
  ListUserFuzzyByUserNameQuery,
  ListUserFuzzyByUserNameQueryVariables
>
