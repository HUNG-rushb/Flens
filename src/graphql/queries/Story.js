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
  query StoryInfo($storyInfoData2: StoryInfoInput!) {
    storyInfo(data: $storyInfoData2) {
      comments {
        userId {
          name
          profileImageURL
        }
        content
        createdAt
      }
      content
      createdAt
      images
      points
      title
      userId {
        backgroundImageURL
        name
      }
    }
  }
`;
