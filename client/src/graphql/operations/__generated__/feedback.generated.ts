import type * as SchemaTypes from '../../generated/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type FeedbackMutationVariables = SchemaTypes.Exact<{
  result: SchemaTypes.Scalars['Boolean']
  userId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
  message?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>
  feedbackId?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>
}>

export type FeedbackMutation = { feedback?: number }

export const FeedbackDocument = gql`
  mutation feedback(
    $result: Boolean!
    $userId: Int
    $message: String
    $feedbackId: Int
  ) {
    feedback(
      result: $result
      userId: $userId
      message: $message
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
 *      userId: // value for 'userId'
 *      message: // value for 'message'
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
