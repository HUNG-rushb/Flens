import {
  CREATE_STORY,
  GET_ALL_STORIES,
  GET_STORY_INFO,
} from './queries/Story.js';
import { useQuery, useMutation } from '@apollo/client';

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

export const useGetAllStories = (cache) => {
  const { data, loading, error } = useQuery(GET_ALL_STORIES, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetStoryInfo = (queryPayload, cache) => {
  const { data, loading, error, refetch } = useQuery(GET_STORY_INFO, {
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
