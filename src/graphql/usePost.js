import {
  CREATE_POST, // GET_POST_INFORMATION,
  GET_ALL_USER_POST,
  GET_ALL_POST_COMMENT,
  CREATE_COMMENT,
} from './queries/Post.js';
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

// export const useGetPostInfo = () => {
//   const { data, loading, error } = useQuery(GET_POST_INFORMATION);

//   return {
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };

// export const usePostInfoLazy = (cache) => {
//   const [getPostInfo, { data, loading, error }] = useLazyQuery(
//     GET_POST_INFORMATION,
//     {
//       fetchPolicy: cache ? undefined : 'no-cache',
//     }
//   );

//   return {
//     usePostInfoLazy: () => {
//       getPostInfo();
//     },
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };

export const useGetAllUserPost = (queryPayload) => {
  const { data, loading, error } = useQuery(GET_ALL_USER_POST, {
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetAllPostComment = (queryPayload) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_POST_COMMENT, {
    variables: queryPayload,
    fetchPolicy: 'no-cache',
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    refetch,
  };
};

// export const useGetAllPostCommentLazy = (queryPayload) => {
//   const { data, loading, error } = useQuery(GET_ALL_POST_COMMENT, {
//     variables: queryPayload,
//   });

//   return {
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };

export const useGetAllPostCommentLazy = (cache) => {
  const [getAllComment, { data, loading, error }] = useLazyQuery(
    GET_ALL_POST_COMMENT,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    getAllCommentLazy: (queryPayload) => {
      getAllComment(queryPayload);
    },
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useCreateCommentLazy = (cache) => {
  const [createComment, { data, loading, error }] = useMutation(
    CREATE_COMMENT,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    createComment,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
