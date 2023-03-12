import { onError } from '@apollo/client/link/error'

export const errorLink = onError(
  ({ operation, forward, graphQLErrors, networkError, response }) => {
    return forward(operation).map(data => data)
  },
)
