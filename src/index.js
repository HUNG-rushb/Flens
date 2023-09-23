import App from './App.js';
import './index.css';
// Apollo Client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities/policies/pagination.js';
import '@babel/polyfill';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom/client';

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getNewFeed: relayStylePagination(),
          // getNewFeed: {
          //   // Don't cache separate results based on
          //   // any of this field's arguments.
          //   // keyArgs: false,
          //   // merge(existing = [], incoming) {
          //   //   return [...existing, ...incoming];
          //   // },

          //   keyArgs: ['type'],

          //   merge(existing, incoming, { args: { cursor }, readField }) {
          //     const merged = existing ? existing.slice(0) : [];
          //     let offset = offsetFromCursor(merged, cursor, readField);
          //     // If we couldn't find the cursor, default to appending to
          //     // the end of the list, so we don't lose any data.
          //     if (offset < 0) offset = merged.length;
          //     // Now that we have a reliable offset, the rest of this logic
          //     // is the same as in offsetLimitPagination.
          //     for (let i = 0; i < incoming.length; ++i) {
          //       merged[offset + i] = incoming[i];
          //     }
          //     return merged;
          //   },
          // },
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

function offsetFromCursor(items, cursor, readField) {
  // Search from the back of the list because the cursor we're
  // looking for is typically the ID of the last item.
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    // Using readField works for both non-normalized objects
    // (returning item.id) and normalized references (returning
    // the id field from the referenced entity object), so it's
    // a good idea to use readField when you're not sure what
    // kind of elements you're dealing with.
    if (readField('id', item) === cursor) {
      // Add one because the cursor identifies the item just
      // before the first item in the page we care about.
      return i + 1;
    }
  }
  // Report that the cursor could not be found.
  return -1;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
