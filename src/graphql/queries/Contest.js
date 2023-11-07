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
