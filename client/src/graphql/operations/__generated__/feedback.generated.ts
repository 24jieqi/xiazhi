import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type FeedbackMutationVariables = SchemaTypes.Exact<{
  result: SchemaTypes.Scalars['Boolean']
  message?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  userId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  feedbackId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
}>

export type FeedbackMutation = { feedback?: number }

export type FeedbackStatisticsQueryVariables = SchemaTypes.Exact<{
  [key: string]: never
}>

export type FeedbackStatisticsQuery = { countPositive?: number }

export const FeedbackDocument = gql`
  mutation Feedback(
    $result: Boolean!
    $message: String
    $userId: Int
    $feedbackId: Int
  ) {
    feedback(
      result: $result
      message: $message
      userId: $userId
      feedbackId: $feedbackId
    )
  }
`
export type FeedbackMutationFn = Apollo.MutationFunction<
  FeedbackMutation,
  FeedbackMutationVariables
>

/**
 * __useFeedbackMutation__
 *
 * To run a mutation, you first call `useFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedbackMutation, { data, loading, error }] = useFeedbackMutation({
 *   variables: {
 *      result: // value for 'result'
 *      message: // value for 'message'
 *      userId: // value for 'userId'
 *      feedbackId: // value for 'feedbackId'
 *   },
 * });
 */
export function useFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FeedbackMutation,
    FeedbackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FeedbackMutation, FeedbackMutationVariables>(
    FeedbackDocument,
    options,
  )
}
export type FeedbackMutationHookResult = ReturnType<typeof useFeedbackMutation>
export type FeedbackMutationResult = Apollo.MutationResult<FeedbackMutation>
export type FeedbackMutationOptions = Apollo.BaseMutationOptions<
  FeedbackMutation,
  FeedbackMutationVariables
>
export const FeedbackStatisticsDocument = gql`
  query FeedbackStatistics {
    countPositive
  }
`

/**
 * __useFeedbackStatisticsQuery__
 *
 * To run a query within a React component, call `useFeedbackStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedbackStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedbackStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedbackStatisticsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FeedbackStatisticsQuery,
    FeedbackStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    FeedbackStatisticsQuery,
    FeedbackStatisticsQueryVariables
  >(FeedbackStatisticsDocument, options)
}
export function useFeedbackStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeedbackStatisticsQuery,
    FeedbackStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    FeedbackStatisticsQuery,
    FeedbackStatisticsQueryVariables
  >(FeedbackStatisticsDocument, options)
}
export type FeedbackStatisticsQueryHookResult = ReturnType<
  typeof useFeedbackStatisticsQuery
>
export type FeedbackStatisticsLazyQueryHookResult = ReturnType<
  typeof useFeedbackStatisticsLazyQuery
>
export type FeedbackStatisticsQueryResult = Apollo.QueryResult<
  FeedbackStatisticsQuery,
  FeedbackStatisticsQueryVariables
>
