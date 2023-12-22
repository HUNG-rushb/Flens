import {
  CREATE_STORY,
  GET_ALL_STORIES,
  GET_STORY_INFO,
  GET_ALL_STORY_COMMENT,
  DELETE_STORY,
  INTERACT_STORY,
  GET_STORY_PAGINATION,
  GET_ALL_USER_STORY,
} from './queries/Story.js';
import { useQuery, useMutation } from '@apollo/client';
import { useCallback } from 'react';

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

export const useGetExploreStory = (payload) => {
  const { data, loading, error, fetchMore } = useQuery(GET_STORY_PAGINATION, {
    fetchPolicy: 'network-only',
    variables: payload,
  });

  const loadNew = useCallback(async () => {
    const a = await fetchMore({
      variables: {
        after: data.getNewStories.pageInfo.endCursor,
      },
    });
    // console.log({ a });
  }, [data]);

  return {
    stories: data?.getNewStories?.edges ?? [],
    hasNextPage: data?.getNewStories?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetAllUserStory = (userId, currentUserId) => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_USER_STORY, {
    fetchPolicy: 'network-only',
    variables: {
      userId,
      currentUserId,
      after: '',
    },
  });
  // console.log({ data });

  const loadNew = useCallback(async () => {
    await fetchMore({
      variables: {
        after: data.getAllUserStories.pageInfo.endCursor,
      },
    });
    // console.log({ a });
  }, [data]);

  return {
    stories: data?.getAllUserStories?.edges ?? [],
    hasNextPage: data?.getAllUserStories?.pageInfo?.hasNextPage ?? true,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    loadNew,
  };
};

export const useGetStoryInfo = (
  queryPayload,
  userId,
  setIsLiked,
  setCountNumberOfLikes
) => {
  const { data, loading, error, refetch } = useQuery(GET_STORY_INFO, {
    fetchPolicy: 'no-cache',
    variables: queryPayload,
    onCompleted: (data) => {
      setIsLiked(data.storyInfo.userLikedStory.includes(userId));
      setCountNumberOfLikes(data.storyInfo.points);
    },
  });

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
    refetch,
  };
};

export const useGetAllStoryComment = (queryPayload) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_STORY_COMMENT, {
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

export const useDeleteStory = () => {
  const [deleteStory, { data, loading, error }] = useMutation(DELETE_STORY, {
    fetchPolicy: 'no-cache',
  });

  return {
    deleteStory,
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const useInteractStory = () => {
  const [interactStory, { data, loading, error, refetch }] = useMutation(
    INTERACT_STORY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  return {
    interactStory,
    isFetching: loading,
    fetchedPostAfterInteract: data,
    fetchError: error,
    refetch,
  };
};
