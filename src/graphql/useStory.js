import {
  CREATE_STORY,
  GET_ALL_STORIES,
  GET_STORY_INFO,
  GET_ALL_STORY_COMMENT,
  DELETE_STORY,
  INTERACT_STORY,
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
