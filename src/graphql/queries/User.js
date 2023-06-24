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

export const UPDATE_IMAGE = gql`
  mutation UpdateImage {
    users {
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateUser($updateUserData: UpdateUserInput!) {
    updateUser(data: $updateUserData) {
      profileImageURL
      backgroundImageURL
      id
      name
    }
  }
`;

export const GET_PROFILE_IMAGE = gql`
  query UserInfo($userInfoData: UserInfoInput!) {
    userInfo(data: $userInfoData) {
      backgroundImageURL
      profileImageURL
      name
    }
  }
`;
