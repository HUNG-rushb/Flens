import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USERS_ID } from "./queries/User";

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
    fetchPolicy: cache ? undefined : "no-cache",
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
