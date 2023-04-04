import { gql } from '@apollo/client'

export const INITIAL_CORE_FIELDS = gql`
  fragment InitialCoreFields on Common {
    __typename
    id
  }
`

export const INITIAL_IS_LOGGED_IN_FIELD = gql`
  fragment InitialIsLoggedIn on Common {
    isLoggedIn
  }
`

export const INITIAL_COMMON_FIELDS = gql`
  ${INITIAL_CORE_FIELDS}
  ${INITIAL_IS_LOGGED_IN_FIELD}

  fragment InitializeCommonFields on Common {
    ...InitialCoreFields
    ...InitialIsLoggedIn
  }
`
