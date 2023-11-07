import {
  CREATE_CONTEST,
  GET_ALL_CONTESTS,
  GET_CONTEST_INFO,
} from './queries/Contest.js';
import { useQuery, useMutation } from '@apollo/client';

export const useCreateContest = () => {
  const [createContest, { data, loading, error }] = useMutation(
    CREATE_CONTEST,
    {
      fetchPolicy: 'no-cache',
    }
  );

  return {
    createContest,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetAllContest = (queryPayload) => {
  const { data, loading, error } = useQuery(GET_ALL_CONTESTS, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetContestInfo = (queryPayload) => {
  const { data, loading, error } = useQuery(GET_CONTEST_INFO, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
