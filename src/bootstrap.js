import App from './App.js';
import './index.css';
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities/policies/pagination.js';
import '@babel/polyfill';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import * as dotenv from 'dotenv';

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getNewFeed: relayStylePagination(),
          getAllUserPosts: relayStylePagination(),
          contestPosts: relayStylePagination(),
        },
      },
    },
  }),
  // !This is live hosted server
  // uri: 'https://social-image-api.link',
  // ! This is a local server
  // ! Use this URL when developing
  uri: 'http://localhost:4000/dev/',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
