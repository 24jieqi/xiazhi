import type { GraphQLFormattedError } from 'graphql'

export function errorHandler(err: GraphQLFormattedError) {
  if (err.extensions?.code === 'UNAUTHENTICATED') {
    return {
      message: err.message,
      code: 401,
    }
  }
  return {
    message: err.message || 'Internal server error',
    extensions: {
      code: 500,
    },
  }
}
