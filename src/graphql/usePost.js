import {
  CREATE_POST,
  GET_ALL_USER_POST,
  GET_ALL_POST_COMMENT,
  CREATE_COMMENT,
  GET_NEW_FEED,
  DELETE_POST,
  INTERACT_POST,
  CHANGE_VISIBLE_POST,
  UPDATE_POINT_POSTING,
  GET_ALL_USER_POST_INFO,
} from './queries/Post.js';
import { CREATE_TAG, SUGGEST_TAG } from './queries/Tag.js';
import { useQuery, useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';

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
};

export const useCreateTag = () => {
  const [createTag, { data, loading, error }] = useMutation(CREATE_TAG, {
    fetchPolicy: 'no-cache',
  });

  return {
    createTag,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useUpdatePointPostingLazy = (cache) => {
  const [updateLevel, { data, loading, error }] = useMutation(
    UPDATE_POINT_POSTING,
    {
      fetchPolicy: cache ? undefined : 'no-cache',
    }
  );

  return {
    updateLevel,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetNewFeed = (userId) => {
  const { data, loading, error, fetchMore } = useQuery(GET_NEW_FEED, {
    fetchPolicy: 'network-only',
    variables: {
      userId,
    },
  });

  const loadNew = useCallback(async () => {
    console.log('load second');

    const fetchMoreData = await fetchMore({
      variables: {
        after: data.getNewFeed.pageInfo.endCursor,
      },
    });
    // console.log({ fetchMoreData });
  }, [data]);

  return {
    posts: data?.getNewFeed?.edges ?? [],
    hasNextPage: data?.getNewFeed?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetAllUserPost = (userId) => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_USER_POST, {
    fetchPolicy: 'network-only',
    variables: {
      userId,
    },
  });

  const loadNew = useCallback(async () => {
    const a = await fetchMore({
      variables: {
        after: data.getAllUserPosts.pageInfo.endCursor,
      },
    });
    console.log({ a });
  }, [data]);

  console.log({ data }, 1426487346);

  return {
    posts: data?.getAllUserPosts?.edges ?? [],
    hasNextPage: data?.getAllUserPosts?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetAllUserPostInfo = (queryPayload) => {
  const { data, loading, error } = useQuery(GET_ALL_USER_POST_INFO, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
  });

  return {
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

export const useDeletePost = () => {
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST, {
    fetchPolicy: 'no-cache',
  });

  return {
    deletePost,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useChangeVisiblePost = (setPublic) => {
  const [updatePost, { data, loading, error }] = useMutation(
    CHANGE_VISIBLE_POST,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        setPublic(data.updatePost.isVisible);
      },
    }
  );

  return {
    updatePost,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useInteractPost = () => {
  const [interactPost, { data, loading, error, refetch }] = useMutation(
    INTERACT_POST,
    {
      fetchPolicy: 'no-cache',
    }
  );

  return {
    interactPost,
    isFetching: loading,
    fetchedPostAfterInteract: data,
    fetchError: error,
    refetch,
  };
};

export const useSuggestTag = () => {
  const { data, loading, error } = useQuery(SUGGEST_TAG, {
    fetchPolicy: 'no-cache',
    // variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
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
