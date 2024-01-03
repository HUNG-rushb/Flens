import { gql } from '@apollo/client';

export const CREATE_CONTEST = gql`
  mutation CreateContest($createContestdata: CreateContestInput!) {
    createContest(data: $createContestdata) {
      id
      name
      contestImageURL
      description

      startDate
      endDate
      isFinished

      contestPrizeList {
        id
        title
        type
        prizeImageURL
        userId {
          id
          name
        }
      }

      joinedUserIds {
        id
        name
      }
    }
  }
`;

export const USER_JOIN_CONTEST = gql`
  mutation UserJoinContest($userJoinContestData: JoinContestInput!) {
    joinContest(data: $userJoinContestData) {
      joinedUserIds {
        id
      }
    }
  }
`;

export const GET_ALL_CONTESTS = gql`
  query AllContests {
    allContests {
      id
      name
      description
      # prize
      startDate
      endDate
      contestImageURL
      isFinished
    }
  }
`;

export const GET_CONTEST_INFO = gql`
  query ContestInfo($contestInfoData: ContestInfoInput!) {
    contestInfo(data: $contestInfoData) {
      contestImageURL
      description
      endDate
      id
      isFinished
      name
      startDate
      joinedUserIds {
        id
      }
      contestPrizeList {
        id
        prizeImageURL
        title
        type
        userId {
          id
          name
          profileImageURL
        }
      }
    }
  }
`;

export const GET_TOP_5_POSTS = gql`
  query GetTopContestPosts($data: ContestInfoInput!) {
    getTopContestPosts(data: $data) {
      id
      points
      userId {
        id
        name
        profileImageURL
      }
      image {
        url
      }
    }
  }
`;

export const END_CONTEST = gql`
  mutation EndContest($data: EndContestInput!) {
    endContest(data: $data) {
      isFinished
      id
    }
  }
`;

export const GET_CONTEST_POSTS = gql`
  query ContestPosts($contestId: String, $userId: String, $after: String) {
    contestPosts(contestId: $contestId, userId: $userId, after: $after) {
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
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
