import {
  CREATE_USER,
  VERIFY_USER,
  UPDATE_PROFILE,
  GET_PROFILE_IMAGE,
} from './queries/User.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

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
