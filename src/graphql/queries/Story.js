import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
  mutation CreateStory($createStoryData: CreateStoryInput!) {
    createStory(data: $createStoryData) {
      id
      title
      points

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
