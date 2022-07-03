import type * as SchemaTypes from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCurrentAppsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetCurrentAppsQuery = { getCurrentApps?: Array<{ __typename?: 'AppItem', app_id?: number, name?: string, description?: string, type?: SchemaTypes.AppTypeEnum, languages?: Array<SchemaTypes.LanguageTypeEnum>, pictures?: Array<string>, access?: boolean, push?: boolean, creatorId?: number, creator?: { __typename?: 'UserInfo', name?: string, user_id?: number, email?: string, nickName?: string, phone?: string, role?: SchemaTypes.UserRoleEnum, avatar?: string } }> };


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
  }
}
    `;

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
export function useGetCurrentAppsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>(GetCurrentAppsDocument, options);
      }
export function useGetCurrentAppsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>(GetCurrentAppsDocument, options);
        }
export type GetCurrentAppsQueryHookResult = ReturnType<typeof useGetCurrentAppsQuery>;
export type GetCurrentAppsLazyQueryHookResult = ReturnType<typeof useGetCurrentAppsLazyQuery>;
export type GetCurrentAppsQueryResult = Apollo.QueryResult<GetCurrentAppsQuery, GetCurrentAppsQueryVariables>;