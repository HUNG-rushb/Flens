import { gql } from '@apollo/client'
import { isEmpty, isNull } from 'lodash'

import { cache } from './cache'
import { INITIAL_COMMON_FIELDS, INITIAL_COMMON_STATE } from './common'
import { LocalCacheName } from './constants'
import { persistor } from './persistor'
import { AppCache } from './types'

export const INITIALIZE_STATE = gql`
  ${INITIAL_COMMON_FIELDS}

  query InitializeState {
    ${LocalCacheName.COMMON} {
      ...InitializeCommonFields
    }
  }
`

export const INITIAL_STATE = { Common: INITIAL_COMMON_STATE }

export const precheckEmptyLocalCache = () => {
  const data = cache.readQuery({
    query: INITIALIZE_STATE,
  })

  return isNull(data)
}

export const initializeLocalCache = async () => {
  await persistor.restore()

  const isEmpty = precheckEmptyLocalCache()

  if (isEmpty) {
    cache.writeQuery<AppCache>({
      query: INITIALIZE_STATE,
      data: INITIAL_STATE,
    })
  }
}
