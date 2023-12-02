import { gql } from '@apollo/client';

export const GET_USER_NOTIS = gql`
  query UserNotis($data: UserNotiInfoInput!) {
    userNotis(data: $data) {
      id
      postId
      type
      createdAt

      userTriggerId {
        name
        profileImageURL
        id
      }
    }
  }
`;
