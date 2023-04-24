import React from 'react';
import ReactDOM from 'react-dom/client';
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '@babel/polyfill';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"

import './index.css';
import App from './App.js';

// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // !This is live hosted server
  uri: 'https://social-image-api.link',
  // ! This is a local server
  // ! Use this URL when developing
  // uri: 'http://localhost:4000/dev/',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
