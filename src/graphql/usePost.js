import {
  CREATE_POST, // GET_POST_INFORMATION,
  GET_ALL_USER_POST,
  GET_ALL_POST_COMMENT,
  CREATE_COMMENT,
  GET_NEW_FEED,
} from './queries/Post.js';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

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

export const useGetNewFeed = (userId, cache) => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const { data, loading, error, fetchMore } = useQuery(GET_NEW_FEED, {
    fetchPolicy: cache ? undefined : 'no-cache',
    variables: {
      getNewFeedData: { userId, offset },
    },
    onCompleted: (data) => {
      setPosts(data.getNewFeed);
      // setHasMorePosts(hasMore);
    },
  });

  // console.log({ data });
  // console.log({ posts });

  const loadNew = useCallback(async () => {
    setOffset((prev) => prev + 2);
    console.log('fawfwgfhefuwyfiuwefh');

    const fetchMoreData = await fetchMore({
      variables: {
        getNewFeedData: { userId, offset: offset + 2 },
      },
    });
    console.log({ fetchMoreData });

    setPosts((prev) => [...prev, fetchMoreData.data.getNewFeed]);
    console.log({ posts }, 'wfwifhuewfhiwuefhiewu379287429847');
  }, []);

  return {
    posts,
    hasMore,
    isFetching: false,
    fetchedData: data,
    fetchError: false,
    loadNew,
  };
};

export const useGetAllUserPost = (queryPayload, cache) => {
  const { data, loading, error } = useQuery(GET_ALL_USER_POST, {
    fetchPolicy: cache ? undefined : 'no-cache',
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
