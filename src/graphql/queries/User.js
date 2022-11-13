import { gql } from '@apollo/client';

export const GET_USERS_ID = gql`
  query GetUsersID {
    users {
      id
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage {
    users {
      id
    }
  }
`;
