import { gql } from '@apollo/client';

export const GET_POST_INFORMATION = gql`
  query getPostInformation {
    post {
      postId
      username
      time
      postInfor {
        title
        content
        camera
        focalLength
        shutterSpeed
        iso
        date
        hashtag
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($createPostData: CreatePostInput!) {
    createPost(data: $createPostData) {
      id
      createdAt
      points
      title
      updatedAt
      image {
        url
        createdAt
        id
        hash
        imageInfoId {
          ISO
          aperture
          camera
          focalLength
          id
          lens
          shutterSpeed
        }
      }
    }
  }
`;
