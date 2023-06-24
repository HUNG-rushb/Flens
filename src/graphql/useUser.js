import { GET_USERS_ID, CREATE_USER, VERIFY_USER } from './queries/User.js';
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

export const useUsersID = () => {
  const { data, loading, error } = useQuery(GET_USERS_ID);

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUsersIDLazy = (cache) => {
  const [getUsersID, { data, loading, error }] = useLazyQuery(GET_USERS_ID, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    getUsersIDLazy: () => {
      getUsersID();
    },
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
