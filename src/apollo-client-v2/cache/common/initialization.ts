import { LocalCacheId, LocalCacheName } from '../constants'
import { CommonState } from './types'

export const INITIAL_COMMON_STATE: CommonState = {
  __typename: LocalCacheName.COMMON,
  id: LocalCacheId.COMMON,
  isLoggedIn: false,
}
