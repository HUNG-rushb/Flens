import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
  mutation CreateStory($createStoryData: CreateStoryInput!) {
    createStory(data: $createStoryData) {
      id
      title
      points
      storyViewStatus

      content
      images
    }
  }
`;

export const GET_ALL_STORIES = gql`
  query AllStories {
    allStories {
      id
      images
      points
      title
      createdAt

      userId {
        name
        profileImageURL
      }
    }
  }
`;

export const GET_STORY_PAGINATION = gql`
  query GetNewStories($limit: Int, $after: String) {
    getNewStories(limit: $limit, after: $after) {
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          images
          points
          storyViewStatus
          tag
          categoryId {
            name
          }
          title
          updatedAt
          userLikedStory
          createdAt
          content
          userId {
            id
            name
            profileImageURL
          }
        }
      }
    }
  }
`;

export const GET_ALL_USER_STORY = gql`
  query GetAllUserStories(
    $userId: String
    $currentUserId: String
    $after: String
  ) {
    getAllUserStories(
      userId: $userId
      currentUserId: $currentUserId
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          images
          points
          tag
          categoryId {
            name
          }
          storyViewStatus
          title
          updatedAt
          userLikedStory
          createdAt
          content

          userId {
            id
            name
            profileImageURL
          }
        }
      }

      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_STORY_INFO = gql`
  query StoryInfo($storyInfoData: StoryInfoInput!) {
    storyInfo(data: $storyInfoData) {
      id
      comments {
        userId {
          name
          profileImageURL
        }
        id
        content
        createdAt
      }
      content
      createdAt
      images
      points
      title
      userLikedStory
      userId {
        backgroundImageURL
        name
      }
    }
  }
`;

export const GET_ALL_STORY_COMMENT = gql`
  query StoryInfo($storyInfoData: StoryInfoInput!) {
    storyInfo(data: $storyInfoData) {
      comments {
        content
        createdAt
        id
        userId {
          profileImageURL
          name
        }
      }
    }
  }
`;

export const DELETE_STORY = gql`
  mutation DeleteStory($deleteStoryData: DeleteStoryInput!) {
    deleteStory(data: $deleteStoryData) {
      id
      title
      userId {
        name
      }
    }
  }
`;

export const INTERACT_STORY = gql`
  mutation InteractStory($interactStoryData: InteractStoryInput!) {
    interactStory(data: $interactStoryData) {
      id
      points
      title
    }
  }
`;
