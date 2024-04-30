import type * as SchemaTypes from '../../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditEntryMutationVariables = SchemaTypes.Exact<{
  entryId: SchemaTypes.Scalars['Int'];
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
  langs?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['JSON']>;
}>;


export type EditEntryMutation = { editEntry: boolean };

export type PageAppEntriesQueryVariables = SchemaTypes.Exact<{
  appId: SchemaTypes.Scalars['Int'];
  key?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
  mainLangText?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
  pageNo: SchemaTypes.Scalars['Int'];
  pageSize: SchemaTypes.Scalars['Int'];
}>;


export type PageAppEntriesQuery = { pageAppEntries: { __typename?: 'EntryPaging', current: number, pageSize: number, total: number, records: Array<{ __typename?: 'Entry', createdAt: number, id: number, key?: string, langs: any, mainLang: string, mainLangText?: string, updatedAt: number }> } };

export type CreateEntryMutationVariables = SchemaTypes.Exact<{
  input: SchemaTypes.CreateEntryInput;
}>;


export type CreateEntryMutation = { createEntry: number };

export type DeleteEntryMutationVariables = SchemaTypes.Exact<{
  deleteEntryId: SchemaTypes.Scalars['Int'];
}>;


export type DeleteEntryMutation = { deleteEntry: boolean };


export const EditEntryDocument = gql`
    mutation EditEntry($entryId: Int!, $key: String, $langs: JSON) {
  editEntry(entryId: $entryId, key: $key, langs: $langs)
}
    `;
export type EditEntryMutationFn = Apollo.MutationFunction<EditEntryMutation, EditEntryMutationVariables>;

/**
 * __useEditEntryMutation__
 *
 * To run a mutation, you first call `useEditEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEntryMutation, { data, loading, error }] = useEditEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *      key: // value for 'key'
 *      langs: // value for 'langs'
 *   },
 * });
 */
export function useEditEntryMutation(baseOptions?: Apollo.MutationHookOptions<EditEntryMutation, EditEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEntryMutation, EditEntryMutationVariables>(EditEntryDocument, options);
      }
export type EditEntryMutationHookResult = ReturnType<typeof useEditEntryMutation>;
export type EditEntryMutationResult = Apollo.MutationResult<EditEntryMutation>;
export type EditEntryMutationOptions = Apollo.BaseMutationOptions<EditEntryMutation, EditEntryMutationVariables>;
export const PageAppEntriesDocument = gql`
    query pageAppEntries($appId: Int!, $key: String, $mainLangText: String, $pageNo: Int!, $pageSize: Int!) {
  pageAppEntries(
    appId: $appId
    key: $key
    mainLangText: $mainLangText
    pageNo: $pageNo
    pageSize: $pageSize
  ) {
    current
    pageSize
    records {
      createdAt
      id
      key
      langs
      mainLang
      mainLangText
      updatedAt
    }
    total
  }
}
    `;

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
 *      appId: // value for 'appId'
 *      key: // value for 'key'
 *      mainLangText: // value for 'mainLangText'
 *      pageNo: // value for 'pageNo'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function usePageAppEntriesQuery(baseOptions: Apollo.QueryHookOptions<PageAppEntriesQuery, PageAppEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageAppEntriesQuery, PageAppEntriesQueryVariables>(PageAppEntriesDocument, options);
      }
export function usePageAppEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageAppEntriesQuery, PageAppEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageAppEntriesQuery, PageAppEntriesQueryVariables>(PageAppEntriesDocument, options);
        }
export type PageAppEntriesQueryHookResult = ReturnType<typeof usePageAppEntriesQuery>;
export type PageAppEntriesLazyQueryHookResult = ReturnType<typeof usePageAppEntriesLazyQuery>;
export type PageAppEntriesQueryResult = Apollo.QueryResult<PageAppEntriesQuery, PageAppEntriesQueryVariables>;
export const CreateEntryDocument = gql`
    mutation createEntry($input: CreateEntryInput!) {
  createEntry(input: $input)
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
 *      input: // value for 'input'
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
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($deleteEntryId: Int!) {
  deleteEntry(id: $deleteEntryId)
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      deleteEntryId: // value for 'deleteEntryId'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, options);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;