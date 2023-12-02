import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      age
      birthday
      createdAt
      email
      id
      name
      phoneNumber
      profileImageURL
    }
  }
`;

export const VERIFY_USER = gql`
  query VerifyUser($verifyUserData: VerifyUserInput!) {
    verifyUser(data: $verifyUserData) {
      id
      isAdmin
      profileImageURL
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage {
    users {
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateUser($updateUserData: UpdateUserInput!) {
    updateUser(data: $updateUserData) {
      profileImageURL
      backgroundImageURL
      id
      name
    }
  }
`;

export const GET_PROFILE_IMAGE = gql`
  query UserInfo($userInfoData: UserInfoInput!) {
    userInfo(data: $userInfoData) {
      backgroundImageURL
      profileImageURL
      name
    }
  }
`;

export const GET_USER_INTEREST = gql`
  query UserInfo($userInfoData: UserInfoInput!) {
    userInfo(data: $userInfoData) {
      interestCategories {
        name
      }
    }
  }
`;

export const GET_PROFILE_FOLLOW = gql`
  query Follower($userInfoData: UserInfoInput!) {
    userFollow(data: $userInfoData) {
      follower {
        userFollower {
          id
          name
          profileImageURL
        }
      }
      following {
        userFollowing {
          id
          name
          profileImageURL
        }
      }
    }
  }
`;

export const SUGGEST_USER_TO_FOLLOW = gql`
  query SuggestUserToFollow(
    $suggestUserToFollowData: SuggestUserToFollowInput!
    $limit: Int
  ) {
    suggestUserToFollow(data: $suggestUserToFollowData, limit: $limit) {
      edges {
        cursor
        node {
          backgroundImageURL
          name
          profileImageURL
          id
          level {
            currentLevel
          }
        }
      }
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query UserFollowingInfo($userFollowingInfoData: UserFollowingInfoInput!) {
    userFollowingInfo(data: $userFollowingInfoData) {
      userFollowing {
        id
        name
      }
      userId {
        id
        name
      }
    }
  }
`;

export const GET_USER_FOLLOWER = gql`
  query UserFollowerInfo($userFollowerInfoData: UserFollowerInfoInput!) {
    userFollowerInfo(data: $userFollowerInfoData) {
      userFollower {
        id
        name
      }
      userId {
        id
        name
      }
    }
  }
`;

export const UPDATE_FOLLOWING = gql`
  mutation UpdateFollowing($updateFollowingData: UpdateFollowingInput!) {
    updateFollowing(data: $updateFollowingData) {
      userFollowing {
        id
        name
      }
      userId {
        id
        name
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($unfollowUserData: UnfollowInput!) {
    unfollowUser(data: $unfollowUserData) {
      userFollowing {
        id
        name
      }
      userId {
        id
        name
      }
    }
  }
`;

export const GET_ALL_USER_CHAT = gql`
  query ChatInfoByUserId($chatInfoByUserIdData: ChatInfoByUserIdInput!) {
    chatInfoByUserId(data: $chatInfoByUserIdData) {
      id
      lastMessageAt
      userIDs {
        id
        name
      }
    }
  }
`;

export const GET_ALL_USER_LEADERBOARD = gql`
  query GetAllUserLeaderboard {
    getAllUserLeaderboard {
      id
      name
      profileImageURL
      level {
        currentLevel
      }
    }
  }
`;

export const GET_ALL_USER_FOLLOWING_LEADERBOARD = gql`
  query GetUserFollowingLeaderBoard($data: UserFollowingLeaderInput!) {
    getUserFollowingLeaderBoard(data: $data) {
      id
      name
      profileImageURL
      level {
        currentLevel
      }
    }
  }
`;
