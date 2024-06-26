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
  SIMILAR_POST,
  EXPLORE_POST,
  POST_INFO,
  UPDATE_POST,
  GET_POST_STATIC,
  TAG_POST,
} from './queries/Post.js';
import { CREATE_TAG, SUGGEST_TAG } from './queries/Tag.js';
import { useQuery, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export const usePostInfo = (queryPayload) => {
  const { data, loading, error } = useQuery(POST_INFO, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

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
      timeCall: 0,
    },
    // onCompleted: (data) => {
    //   console.log(data);
    // },
  });

  const loadNew = useCallback(async () => {
    await fetchMore({
      variables: {
        after: data ? data.getNewFeed.pageInfo.endCursor : '',
        timeCall: data ? data.getNewFeed.timeCall : 0,
      },
    });

    // console.log({ fetchMoreData });
    // console.log(fetchMoreData.data.getNewFeed.edges.length);
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

export const useGetAllUserPost = (userId, currentUserId) => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_USER_POST, {
    fetchPolicy: 'network-only',
    variables: {
      userId,
      currentUserId,
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

export const useChangeVisiblePost = (
  setCurrentPostVisibility,
  setPostVisibilityInPost
) => {
  const [updatePost, { data, loading, error }] = useMutation(
    CHANGE_VISIBLE_POST,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        setCurrentPostVisibility(data.updatePost.postViewStatus);
        setPostVisibilityInPost(data.updatePost.postViewStatus);
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

export const useGetExplore = (queryPayload) => {
  const { data, loading, error, fetchMore } = useQuery(EXPLORE_POST, {
    fetchPolicy: 'network-only',
    variables: queryPayload,
    // onCompleted: (data) => {
    //   console.log(data);
    // },
  });
  console.log({ data });

  const loadNew = useCallback(async () => {
    console.log('load new');
    const fetchMoreData = await fetchMore({
      variables: {
        after: data ? data.explorePosts.pageInfo.endCursor : '',
      },
    });

    console.log({ fetchMoreData });
  }, [data]);

  return {
    posts: data?.explorePosts?.edges ?? [],
    hasNextPage: data?.explorePosts?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetSimilarPost = (queryPayload) => {
  const { data, loading, error, fetchMore } = useQuery(SIMILAR_POST, {
    fetchPolicy: 'network-only',
    variables: queryPayload,
    // onCompleted: (data) => {
    //   console.log(data);
    // },
  });

  const loadNew = useCallback(async () => {
    const fetchMoreData = await fetchMore({
      variables: {
        after: data ? data.similarPosts.pageInfo.endCursor : '',
      },
    });

    // console.log({ fetchMoreData });
  }, [data]);

  return {
    posts: data?.similarPosts?.edges ?? [],
    hasNextPage: data?.similarPosts?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetTagPost = (queryPayload) => {
  const { data, loading, error, fetchMore } = useQuery(TAG_POST, {
    fetchPolicy: 'network-only',
    variables: queryPayload,
    // onCompleted: (data) => {
    //   console.log(data);
    // },
  });

  const loadNew = useCallback(async () => {
    const fetchMoreData = await fetchMore({
      variables: {
        after: data ? data.similarPosts.pageInfo.endCursor : '',
      },
    });

    // console.log({ fetchMoreData });
  }, [data]);

  return {
    posts: data?.similarPosts?.edges ?? [],
    hasNextPage: data?.similarPosts?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useUpdatePostInfo = (cache) => {
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST, {
    fetchPolicy: cache ? undefined : 'no-cache',
  });

  return {
    updatePost,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useGetStatistic = () => {
  const { data, loading, error } = useQuery(GET_POST_STATIC, {
    fetchPolicy: 'no-cache',
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};
