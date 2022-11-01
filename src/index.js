import React from 'react';
import ReactDOM from 'react-dom/client';
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// App
// import './index.css';
import App from './App.js';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // !This is live hosted server
  uri: 'https://yju3xdivg6.execute-api.ap-southeast-1.amazonaws.com/dev/',
  // ! This is local server
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

console.log(123);
