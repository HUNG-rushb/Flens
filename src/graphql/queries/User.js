import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      age
      birthday
      createdAt
      email
      id
      name
      phoneNumber
      profileImageURL
    }
  }
`;

export const VERIFY_USER = gql`
  query VerifyUser($verifyUserData: VerifyUserInput!) {
    verifyUser(data: $verifyUserData) {
      id
      isAdmin
      profileImageURL
    }
  }
`;

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
