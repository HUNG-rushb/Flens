// import { cache } from './cache'
// import { Common, updateIsLoggedIn } from './cache/common/resolvers'
import { clientLink } from './links/index.jsx';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// import { typeDefs } from './schema'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: clientLink,
  //   typeDefs,
  //   resolvers: {
  //     Mutation: {
  //       updateIsLoggedIn,
  //     },
  //     Common,
  //   },
});
