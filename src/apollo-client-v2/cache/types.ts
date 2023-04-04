import { NormalizedCacheObject } from '@apollo/client'

import { CommonState } from './common'

export interface AppCache extends NormalizedCacheObject {
  Common: CommonState
}
