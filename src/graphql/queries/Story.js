import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
  mutation CreateStory($createStoryData: CreateStoryInput!) {
    createStory(data: $createStoryData) {
      id
      title
      points

      content
      images
      cmts
    }
  }
`;

// export const GET_ALL_USER_POST = gql`
//   query UserInfo($getAllUserPostId: UserInfoInput!) {
//     userInfo(data: $getAllUserPostId) {
//       posts {
//         id
//         points
//         title
//         createdAt
//         image {
//           url
//           imageInfoId {
//             ISO
//             aperture
//             camera
//             copyRight
//             focalLength
//             lens
//             shutterSpeed
//             takenWhen
//           }
//         }
//       }
//     }
//   }
// `;

// export const GET_ALL_POST_COMMENT = gql`
//   query PostInfo($postInfo: PostInfoInput!) {
//     postInfo(data: $postInfo) {
//       comments {
//         id
//         content
//         createdAt
//       }
//     }
//   }
// `;

// export const CREATE_COMMENT = gql`
//   mutation CreateComment($createCommentData: CreateCommentInput!) {
//     createComment(data: $createCommentData) {
//       id
//       content
//       # userId {
//       #   name
//       # }
//       # postId {
//       #   title
//       # }
//     }
//   }
// `;
