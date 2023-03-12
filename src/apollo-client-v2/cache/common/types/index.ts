import { StoreObject } from '@apollo/client'

export interface CommonState extends StoreObject {
  __typename: string
  id: string
  isLoggedIn: boolean
}
