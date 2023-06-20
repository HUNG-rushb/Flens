import { CREATE_STORY } from './queries/Story.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

export const useCreateStoryLazy = (cache) => {
  const [createStory, { data, loading, error }] = useMutation(CREATE_STORY, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    createStory,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

// export const useGetAllUserPost = (queryPayload) => {
//   const { data, loading, error } = useQuery(GET_ALL_USER_POST, {
//     variables: queryPayload,
//   });

//   return {
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };

// export const useGetAllPostComment = (queryPayload) => {
//   const { data, loading, error, refetch } = useQuery(GET_ALL_POST_COMMENT, {
//     variables: queryPayload,
//     fetchPolicy: 'no-cache',
//   });

//   return {
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//     refetch,
//   };
// };

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

// !!!!!!!!!!!!
// !!!!!!!!!!!!
// !!!!!!!!!!!!
// export const useGetAllPostCommentLazy = (cache) => {
//   const [getAllComment, { data, loading, error }] = useLazyQuery(
//     GET_ALL_POST_COMMENT,
//     {
//       fetchPolicy: cache ? undefined : 'no-cache',
//     }
//   );

//   return {
//     getAllCommentLazy: (queryPayload) => {
//       getAllComment(queryPayload);
//     },
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };

// export const useCreateCommentLazy = (cache) => {
//   const [createComment, { data, loading, error }] = useMutation(
//     CREATE_COMMENT,
//     {
//       fetchPolicy: cache ? undefined : 'no-cache',
//     }
//   );

//   return {
//     createComment,
//     isFetching: loading,
//     fetchedData: data,
//     fetchError: error,
//   };
// };
