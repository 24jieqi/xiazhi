import type * as SchemaTypes from '../../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAppsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetAppsQuery = { getApps: Array<{ __typename?: 'App', access: boolean, accessKey?: string, appId: number, createdAt: number, description?: string, languages: Array<string>, name: string, pictures: Array<string>, push: boolean, entries: Array<{ __typename?: 'Entry', id: number, key?: string, langs: any, mainLang: string, mainLangText?: string, createdAt: number }> }> };

export type CreateAppMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateAppInput;
}>;


export type CreateAppMutation = { createApp: number };

export type RefreshAccessKeyMutationVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int'];
}>;


export type RefreshAccessKeyMutation = { refreshAccessKey: string };

export type GetAppByIdQueryVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int'];
}>;


export type GetAppByIdQuery = { getAppById: { __typename?: 'App', access: boolean, accessKey?: string, appId: number, createdAt: number, description?: string, languages: Array<string>, name: string, pictures: Array<string>, push: boolean, entries: Array<{ __typename?: 'Entry', createdAt: number, id: number, key?: string, langs: any, mainLang: string, mainLangText?: string, updatedAt: number }> } };


export const GetAppsDocument = gql`
    query getApps {
  getApps {
    access
    accessKey
    appId
    createdAt
    description
    entries {
      id
      key
      langs
      mainLang
      mainLangText
      createdAt
    }
    languages
    name
    pictures
    push
  }
}
    `;

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsQuery(baseOptions?: Apollo.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppsQuery, GetAppsQueryVariables>(GetAppsDocument, options);
      }
export function useGetAppsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppsQuery, GetAppsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(GetAppsDocument, options);
        }
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>;
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>;
export type GetAppsQueryResult = Apollo.QueryResult<GetAppsQuery, GetAppsQueryVariables>;
export const CreateAppDocument = gql`
    mutation createApp($input: CreateAppInput!) {
  createApp(input: $input)
}
    `;
export type CreateAppMutationFn = Apollo.MutationFunction<CreateAppMutation, CreateAppMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppMutation, CreateAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(CreateAppDocument, options);
      }
export type CreateAppMutationHookResult = ReturnType<typeof useCreateAppMutation>;
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>;
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<CreateAppMutation, CreateAppMutationVariables>;
export const RefreshAccessKeyDocument = gql`
    mutation refreshAccessKey($appId: Int!) {
  refreshAccessKey(appId: $appId)
}
    `;
export type RefreshAccessKeyMutationFn = Apollo.MutationFunction<RefreshAccessKeyMutation, RefreshAccessKeyMutationVariables>;

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
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useRefreshAccessKeyMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAccessKeyMutation, RefreshAccessKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAccessKeyMutation, RefreshAccessKeyMutationVariables>(RefreshAccessKeyDocument, options);
      }
export type RefreshAccessKeyMutationHookResult = ReturnType<typeof useRefreshAccessKeyMutation>;
export type RefreshAccessKeyMutationResult = Apollo.MutationResult<RefreshAccessKeyMutation>;
export type RefreshAccessKeyMutationOptions = Apollo.BaseMutationOptions<RefreshAccessKeyMutation, RefreshAccessKeyMutationVariables>;
export const GetAppByIdDocument = gql`
    query getAppById($appId: Int!) {
  getAppById(appId: $appId) {
    access
    accessKey
    appId
    createdAt
    description
    entries {
      createdAt
      id
      key
      langs
      mainLang
      mainLangText
      updatedAt
    }
    languages
    name
    pictures
    push
  }
}
    `;

/**
 * __useGetAppByIdQuery__
 *
 * To run a query within a React component, call `useGetAppByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppByIdQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetAppByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAppByIdQuery, GetAppByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppByIdQuery, GetAppByIdQueryVariables>(GetAppByIdDocument, options);
      }
export function useGetAppByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppByIdQuery, GetAppByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppByIdQuery, GetAppByIdQueryVariables>(GetAppByIdDocument, options);
        }
export type GetAppByIdQueryHookResult = ReturnType<typeof useGetAppByIdQuery>;
export type GetAppByIdLazyQueryHookResult = ReturnType<typeof useGetAppByIdLazyQuery>;
export type GetAppByIdQueryResult = Apollo.QueryResult<GetAppByIdQuery, GetAppByIdQueryVariables>;