import {
  CREATE_REPORT,
  GET_ALL_REPORTS,
  UPDATE_REPORT_POST,
  UPDATE_REPORT_STORY,
} from './queries/Report.js';
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

export const useUpdateReportPost = (cache) => {
  const [reportedPost, { data, loading, error }] = useMutation(
    UPDATE_REPORT_POST,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    reportedPost,
    isFetching: loading,
    fetchedData: data,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    fetchError: error,
  };
};

export const useUpdateReportStory = (cache) => {
  const [reportedStory, { data, loading, error }] = useMutation(
    UPDATE_REPORT_STORY,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    reportedStory,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
