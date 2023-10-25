import {
  CREATE_USER,
  VERIFY_USER,
  UPDATE_PROFILE,
  GET_PROFILE_IMAGE,
  SUGGEST_USER_TO_FOLLOW,
  UPDATE_FOLLOWING,
  UNFOLLOW_USER,
  GET_USER_FOLLOWING,
  GET_USER_FOLLOWER,
} from './queries/User.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash';

export const useCreateUserLazy = (cache) => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  return {
    createUser,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useVerifyUserLazy = (cache) => {
  const [verifyUser, { data, loading, error }] = useLazyQuery(VERIFY_USER, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    verifyUser,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUpdateProfileLazy = (cache) => {
  const [updateProfile, { data, loading, error }] = useMutation(
    UPDATE_PROFILE,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    updateProfile,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUserProfileImage = (queryPayload, cache) => {
  const { data, loading, error } = useQuery(GET_PROFILE_IMAGE, {
    fetchPolicy: cache ? undefined : 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useSuggestUserToFollow = (queryPayload, cache) => {
  const { data, loading, error } = useQuery(SUGGEST_USER_TO_FOLLOW, {
    fetchPolicy: cache ? undefined : 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetUserFollowing = (queryPayload, userId, setFollow) => {
  const { data, loading, error } = useQuery(GET_USER_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
    onCompleted: (data) => {
      // console.log(data.userFollowingInfo.userFollowing);

      setFollow(
        _.find(data.userFollowingInfo.userFollowing, { id: userId })
          ? true
          : false
      );
    },
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetUserFollower = (queryPayload, cache) => {
  const { data, loading, error } = useQuery(GET_USER_FOLLOWER, {
    fetchPolicy: cache ? undefined : 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUpdateFollowing = () => {
  const [updateFollowing, { data, loading, error }] = useMutation(
    UPDATE_FOLLOWING,
    {
      fetchPolicy: 'no-cache',
    }
  );

  return {
    updateFollowing,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUnfollowUser = () => {
  const [unfollowUser, { data, loading, error }] = useMutation(UNFOLLOW_USER, {
    fetchPolicy: 'no-cache',
  });

  return {
    unfollowUser,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
// export const useLazyApplication = (cache?: boolean): UseLazyApplicationHook => {
//     const [getApplication, { data, loading, error }] = useLazyQuery<{ application: Application }, QueryApplicationArgs>(
//         GET_APPLICATION,
//         {
//             fetchPolicy: cache ? undefined : 'no-cache'
//         }
//     );

//     return {
//         fetchApplication: ({ applicationId }) => getApplication({ variables: { applicationId } }),
//         isFetchingApplication: loading,
//         fetchedApplication: data?.application,
//         fetchingApplicationError: error
//     };
// };
