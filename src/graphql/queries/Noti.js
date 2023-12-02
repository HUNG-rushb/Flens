import { gql } from '@apollo/client';

export const GET_USER_NOTIS = gql`
  query UserNotis($data: UserNotiInfoInput!) {
    userNotis(data: $data) {
      id
      postId
      postTitle
      postImage
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
