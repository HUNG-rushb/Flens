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
