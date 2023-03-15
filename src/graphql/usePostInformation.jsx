import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POST_INFORMATION } from "./queries/post/Post.jsx";

export const useGetPostInfo = () => {
  const { data, loading, error } = useQuery(GET_POST_INFORMATION);

  return {
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};

export const usePostInfoLazy = (cache) => {
  const [getPostInfo, { data, loading, error }] = useLazyQuery(GET_POST_INFORMATION, {
    fetchPolicy: cache ? undefined : "no-cache",
  });

  return {
    usePostInfoLazy: () => {
    getPostInfo();
    },
    isFetching: loading,
    fetchedData: data,
    fetchError: error,
  };
};