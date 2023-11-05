import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostData: CreatePostInput!) {
    createPost(data: $createPostData) {
      id
      createdAt
      points
      title
      postViewStatus
      updatedAt

      categoryId {
        name
      }

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

export const GET_ALL_USER_POST = gql`
  query GetAllUserPosts(
    $userId: String
    $currentUserId: String
    $after: String
  ) {
    getAllUserPosts(
      userId: $userId
      currentUserId: $currentUserId
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          points
          title
          caption
          postViewStatus
          createdAt
          userLikedPost
          tag

          userId {
            profileImageURL
            name
            id
          }

          image {
            url
            imageInfoId {
              ISO
              aperture
              camera
              copyRight
              focalLength
              lens
              shutterSpeed
              takenWhen
            }
          }
        }
      }

      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_NEW_FEED = gql`
  query GetNewFeed($userId: String, $after: String, $timeCall: Int) {
    getNewFeed(userId: $userId, after: $after, timeCall: $timeCall) {
      edges {
        cursor
        node {
          id
          points
          title
          caption
          postViewStatus
          createdAt
          userLikedPost
          tag

          userId {
            profileImageURL
            name
            id
          }

          image {
            url
            imageInfoId {
              ISO
              aperture
              camera
              copyRight
              focalLength
              lens
              shutterSpeed
              takenWhen
            }
          }
        }
      }

      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }

      timeCall
    }
  }
`;

export const GET_ALL_USER_POST_INFO = gql`
  query UserInfo($getAllUserPostId: UserInfoInput!) {
    userInfo(data: $getAllUserPostId) {
      posts {
        id
        points
        title
        caption
        postViewStatus
        createdAt
        userId {
          profileImageURL
          name
        }
        image {
          url
          imageInfoId {
            ISO
            aperture
            camera
            copyRight
            focalLength
            lens
            shutterSpeed
            takenWhen
          }
        }
      }
    }
  }
`;

export const GET_ALL_POST_COMMENT = gql`
  query PostInfo($postInfo: PostInfoInput!) {
    postInfo(data: $postInfo) {
      comments {
        id
        content
        createdAt

        userId {
          name
          profileImageURL
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentData: CreateCommentInput!) {
    createComment(data: $createCommentData) {
      id
      content
      # userId {
      #   name
      # }
      # postId {
      #   title
      # }
    }
  }
`;

export const INTERACT_POST = gql`
  mutation InteractPost($interactPostData: InteractPostInput!) {
    interactPost(data: $interactPostData) {
      points
      userLikedPost
      id
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($deletePostData: DeletePostInput!) {
    deletePost(data: $deletePostData) {
      id
      createdAt
      title
      userId {
        name
      }
    }
  }
`;

// !!!!!!!!!!
export const REPORT_POST = gql`
  mutation InteractPost($interactPostData: InteractPostInput!) {
    interactPost(data: $interactPostData) {
      points
    }
  }
`;

export const CHANGE_VISIBLE_POST = gql`
  mutation UpdatePost($changeVisiblePostData: UpdatePostInput!) {
    updatePost(data: $changeVisiblePostData) {
      id
      title
      postViewStatus
    }
  }
`;

export const UPDATE_POINT_POSTING = gql`
  mutation UpdateLevel($updatePointPostingData: UpdateLevelInput!) {
    updateLevel(data: $updatePointPostingData) {
      currentLevel
      currentXP
      id
      userId {
        name
        id
      }
    }
  }
`;
