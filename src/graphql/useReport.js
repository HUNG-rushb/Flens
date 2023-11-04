import { CREATE_REPORT, GET_ALL_REPORTS } from './queries/Report.js';
import { useQuery, useMutation } from '@apollo/client';

export const useCreateReport = (cache) => {
  const [createReport, { data, loading, error }] = useMutation(CREATE_REPORT, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    createReport,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetAllReport = (queryPayload) => {
  const { data, loading, error } = useQuery(GET_ALL_REPORTS, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
