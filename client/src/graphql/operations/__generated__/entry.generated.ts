import type * as SchemaTypes from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PageAllPublicEntriesQueryVariables = SchemaTypes.Exact<{
  pageSize: SchemaTypes.Scalars['Int'];
  pageNo: SchemaTypes.Scalars['Int'];
}>;


export type PageAllPublicEntriesQuery = { pageAllPublicEntries?: { __typename?: 'EntryPaging', total: number, pageSize: number, current: number, records?: Array<{ __typename?: 'EntryItem', entry_id: number, key?: string, createdAt?: number, updatedAt?: number, public?: boolean, archive?: boolean, deleted?: boolean, mainLangText?: string, mainLang?: SchemaTypes.LanguageTypeEnum, langs?: any, modifyRecords?: Array<{ __typename?: 'RecordItem', record_id: number, createdAt?: number, entryEntry_id?: number, prevLangs?: any }> }> } };

export type CreateEntryMutationVariables = SchemaTypes.Exact<{
  appId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSONObject']>;
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type CreateEntryMutation = { createEntry?: number };

export type UpdateEntryMutationVariables = SchemaTypes.Exact<{
  entryId: SchemaTypes.Scalars['Int'];
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSONObject']>;
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
}>;


export type UpdateEntryMutation = { updateEntry?: boolean };


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
      }
      langs
    }
  }
}
    `;

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
export function usePageAllPublicEntriesQuery(baseOptions: Apollo.QueryHookOptions<PageAllPublicEntriesQuery, PageAllPublicEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageAllPublicEntriesQuery, PageAllPublicEntriesQueryVariables>(PageAllPublicEntriesDocument, options);
      }
export function usePageAllPublicEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageAllPublicEntriesQuery, PageAllPublicEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageAllPublicEntriesQuery, PageAllPublicEntriesQueryVariables>(PageAllPublicEntriesDocument, options);
        }
export type PageAllPublicEntriesQueryHookResult = ReturnType<typeof usePageAllPublicEntriesQuery>;
export type PageAllPublicEntriesLazyQueryHookResult = ReturnType<typeof usePageAllPublicEntriesLazyQuery>;
export type PageAllPublicEntriesQueryResult = Apollo.QueryResult<PageAllPublicEntriesQuery, PageAllPublicEntriesQueryVariables>;
export const CreateEntryDocument = gql`
    mutation CreateEntry($appId: Int, $langs: JSONObject, $key: String) {
  createEntry(appId: $appId, langs: $langs, key: $key)
}
    `;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

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
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const UpdateEntryDocument = gql`
    mutation UpdateEntry($entryId: Int!, $langs: JSONObject, $key: String) {
  updateEntry(entryId: $entryId, langs: $langs, key: $key)
}
    `;
export type UpdateEntryMutationFn = Apollo.MutationFunction<UpdateEntryMutation, UpdateEntryMutationVariables>;

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
export function useUpdateEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(UpdateEntryDocument, options);
      }
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>;
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>;
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEntryMutation, UpdateEntryMutationVariables>;