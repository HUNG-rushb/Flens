import { gql } from '@apollo/client';

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($createAlbumData: CreateAlbumInput!) {
    createAlbum(data: $createAlbumData) {
      id
      name
      createdAt
      updatedAt
      userId {
        name
      }
    }
  }
`;

export const GET_ALL_USER_ALBUM = gql`
  query UserAllAlbum($userAllAlbumData: UserAllAlbumInput!) {
    userAllAlbum(data: $userAllAlbumData) {
      name
      id
      posts {
        id

        image {
          url
        }
      }
    }
  }
`;

export const GET_ALBUM_INFO = gql`
  query AlbumInfo($data: AlbumInfoInput!) {
    albumInfo(data: $data) {
      id
      image {
        url
        id
      }
    }
  }
`;
