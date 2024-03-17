import { gql } from '@apollo/client';

export const SEARCH_QUERIES = gql`
  query SearchQuery($searchQueryData: SearchQueryInput!) {
    searchQuery(data: $searchQueryData) {
      users {
        id
        name
        profileImageURL
      }
      tags {
        id
        name
      }
    }
  }
`;

export const SEARCH_RESULT = gql`
  query SearchResult($data: SearchQueryInput!) {
    searchResult(data: $data) {
      tags {
        name
      }
      users {
        id
        name
        profileImageURL
      }
      posts {
        id
        image {
          url
        }
      }
      stories {
        id
        images
        title
      }
    }
  }
`;
