import {
  CREATE_CONTEST,
  GET_ALL_CONTESTS,
  GET_CONTEST_INFO,
  GET_CONTEST_POSTS,
} from './queries/Contest.js';
import { useQuery, useMutation } from '@apollo/client';
import { useCallback } from 'react';

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

export const useGetContestPosts = (contestId) => {
  const { data, loading, error, fetchMore } = useQuery(GET_CONTEST_POSTS, {
    fetchPolicy: 'network-only',
    variables: {
      contestId,
    },
  });

  const loadNew = useCallback(async () => {
    const a = await fetchMore({
      variables: {
        after: data.contestPosts.pageInfo.endCursor,
      },
    });
    console.log({ a });
  }, [data]);

  return {
    posts: data?.contestPosts?.edges ?? [],
    hasNextPage: data?.contestPosts?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};
