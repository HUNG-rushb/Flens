import { SEARCH_QUERIES, SEARCH_RESULT } from './queries/Search.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash';

export const useSearchQuery = (cache) => {
  const [searchQuery, { data, loading, error }] = useLazyQuery(SEARCH_QUERIES, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    searchQuery,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useSearchResult = (payload) => {
  const { data, loading, error } = useQuery(SEARCH_RESULT, {
    fetchPolicy: 'no-cache',
    variables: payload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
