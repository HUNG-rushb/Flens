import { CREATE_ALBUM, GET_ALL_USER_ALBUM } from './queries/Album.js';
import { useQuery, useMutation } from '@apollo/client';

// import { useCallback, useEffect, useState } from 'react';

export const useGetAllUserAlbum = (queryPayload, cache) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USER_ALBUM, {
    fetchPolicy: cache ? undefined : 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    refetch,
  };
};

export const useCreateAlbumLazy = (cache) => {
  const [createAlbum, { data, loading, error }] = useMutation(CREATE_ALBUM, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    createAlbum,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
