import * as React from 'react';
import ReactDOM from 'react-dom/client';
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import '@babel/polyfill';

// App
// import './index.css';
import App from './App.js';

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
