import { SEARCH_QUERIES } from './queries/Search.js';
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
