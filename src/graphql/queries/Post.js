import { gql } from '@apollo/client';

export const POST_INFO = gql`
  query PostInfo($postInfoData: PostInfoInput!) {
    postInfo(data: $postInfoData) {
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
        level {
          currentLevel
        }
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
`;

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
            level {
              currentLevel
            }
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
            level {
              currentLevel
            }
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

        child {
          id
          content
          createdAt

          userId {
            name
            profileImageURL
          }
        }

        upVoteUserlist
        downVoteUserlist
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

export const EXPLORE_POST = gql`
  query ExplorePosts($data: ExplorePostsInput, $limit: Int, $after: String) {
    explorePosts(data: $data, limit: $limit, after: $after) {
      pageInfo {
        startCursor
        hasPreviousPage
        endCursor
        hasNextPage
      }

      edges {
        cursor
        node {
          caption
          title
          createdAt
          id
          points
          userLikedPost
          tag
          postViewStatus
          categoryId {
            name
          }
          userId {
            name
            id
            profileImageURL
            level {
              currentLevel
            }
          }
          image {
            url
          }
        }
      }
    }
  }
`;

export const SIMILAR_POST = gql`
  query SimilarPosts($data: SimilarPostsInput!, $limit: Int, $after: String) {
    similarPosts(data: $data, limit: $limit, after: $after) {
      pageInfo {
        startCursor
        hasPreviousPage
        endCursor
        hasNextPage
      }

      edges {
        cursor
        node {
          caption
          title
          createdAt
          id
          points
          userLikedPost
          tag
          postViewStatus
          categoryId {
            name
          }
          userId {
            name
            id
            profileImageURL
          }

          image {
            url
          }
        }
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($data: UpdatePostInput!) {
    updatePost(data: $data) {
      id
      caption
      title
      image {
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
        url
      }
    }
  }
`;

export const GET_POST_STATIC = gql`
  query Query {
    allPostsTimestamp {
      month
      year
    }
  }
`;

export const TAG_POST = gql`
  query TagSearchPosts(
    $data: TagSearchPostInput!
    $limit: Int
    $after: String
  ) {
    tagSearchPosts(data: $data, limit: $limit, after: $after) {
      pageInfo {
        startCursor
        hasPreviousPage
        endCursor
        hasNextPage
      }

      edges {
        cursor
        node {
          caption
          title
          createdAt
          id
          points
          userLikedPost
          tag
          postViewStatus
          categoryId {
            name
          }
          userId {
            name
            id
            profileImageURL
          }

          image {
            url
          }
        }
      }
    }
  }
`;
