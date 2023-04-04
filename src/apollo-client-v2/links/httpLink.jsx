import { HttpLink } from '@apollo/client'

export const httpLink = new HttpLink({
  uri: 'https://graphql.anilist.co/',
})
