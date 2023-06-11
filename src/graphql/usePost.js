import { CREATE_POST, GET_POST_INFORMATION } from './queries/Post.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

export const useCreatePostLazy = (cache) => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    createPost,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };

  // input CreatePostInput {
  //   userId: ID!

  //   title: String!

  //   imageURL: String!
  //   imageHash: String!

  //   camera: String
  //   lens: String
  //   aperture: String
  //   focalLength: String
  //   shutterSpeed: String
  //   ISO: String
  //   takenWhen: String
  //   copyRight: String
  // }
};

export const useGetPostInfo = () => {
  const { data, loading, error } = useQuery(GET_POST_INFORMATION);

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const usePostInfoLazy = (cache) => {
  const [getPostInfo, { data, loading, error }] = useLazyQuery(
    GET_POST_INFORMATION,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    usePostInfoLazy: () => {
      getPostInfo();
    },
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
