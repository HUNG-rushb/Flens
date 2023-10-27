import { CREATE_ALBUM, GET_ALL_USER_ALBUM } from './queries/Album.js';
import { useQuery, useMutation } from '@apollo/client';

export const useGetAllUserAlbum = (queryPayload, setAlbum = () => {}) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USER_ALBUM, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
    onCompleted: (data) => {
      // console.log(data);
      setAlbum(data.userAllAlbum[0]);
    },
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
