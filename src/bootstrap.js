import App from './App.js';
import './index.css';
// Apollo Client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/graphql/getFromAST.js';
import { relayStylePagination } from '@apollo/client/utilities/policies/pagination.js';
import '@babel/polyfill';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from 'graphql-ws';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import * as dotenv from 'dotenv';

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const wsLink = new GraphQLWsLink(
  createClient({
    // url: 'ws://localhost:4000',
    url: 'ws://roxqm2ljb8.execute-api.ap-southeast-1.amazonaws.com',
  })
);

const httpLink = new HttpLink({
  // uri: `http://localhost:4000/dev`,
  uri: `https://roxqm2ljb8.execute-api.ap-southeast-1.amazonaws.com`,
});

const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: httpLink,
  headers:{
    'Content-Type': 'application/json',
    'apollo-require-preflight': true,
    'Access-Control-Allow-Origin': 'https://roxqm2ljb8.execute-api.ap-southeast-1.amazonaws.com/',
    "Access-Control-Allow-Credentials" : true
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getNewFeed: relayStylePagination(),
          getAllUserPosts: relayStylePagination(),
          contestPosts: relayStylePagination(),

          getAllUserStories: relayStylePagination(),
          getNewStories: relayStylePagination(),

          explorePosts: relayStylePagination(),
          similarPosts: relayStylePagination(),
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
