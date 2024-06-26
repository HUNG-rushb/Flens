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

export const NOT_IN_ALBUM = gql`
  query PostNotInAlbum($data: NotInAlbumInfoInput!) {
    postNotInAlbum(data: $data) {
      image {
        url
      }
      id
    }
  }
`;

export const ADD_PHOTO_TO_ALBUM = gql`
  mutation AddNewPhotoToAlbum($data: UpdateAlbumInput!) {
    addNewPhotoToAlbum(data: $data) {
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
