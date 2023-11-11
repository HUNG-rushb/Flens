import { gql } from '@apollo/client';

export const CREATE_CONTEST = gql`
  mutation CreateContest($createContestdata: CreateContestInput!) {
    createContest(data: $createContestdata) {
      id
      name
      prize
      contestImageURL
      description

      startDate
      endDate
    }
  }
`;

export const GET_ALL_CONTESTS = gql`
  query AllContests {
    allContests {
      id
      name
      description
      prize
      startDate
      endDate
      contestImageURL
    }
  }
`;

export const GET_CONTEST_INFO = gql`
  query ContestInfo($contestInfoData: ContestInfoInput!) {
    contestInfo(data: $contestInfoData) {
      id
      name
      contestImageURL
      description
      prize
      startDate
      endDate
    }
  }
`;

export const GET_CONTEST_POSTS = gql`
  query ContestPosts($contestId: String, $after: String) {
    contestPosts(contestId: $contestId, after: $after) {
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
          contestId

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
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
