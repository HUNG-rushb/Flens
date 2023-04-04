import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist'

import { cache } from './cache'
import { LocalField } from './constants'

const checkIsLocalField = (key: string) => {
  return LocalField.has(key)
}

export const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
  persistenceMapper: data => {
    const parsedData = JSON.parse(data)

    const persistedData = Object.fromEntries(
      Object.entries(parsedData).filter(([key]) => {
        return checkIsLocalField(key)
      }),
    )

    return Promise.resolve(JSON.stringify(persistedData))
  },
})
