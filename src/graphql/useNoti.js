import { GET_USER_NOTIS } from './queries/Noti.js';
import { useQuery, useMutation } from '@apollo/client';

export const useGetNotis = (payload) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_NOTIS, {
    fetchPolicy: 'no-cache',
    variables: payload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    refetch,
  };
};
