import { useAuthState } from '../../../context/AuthContext';
import {
  useGetAllPostComment,
  useCreateCommentLazy,
} from '../../../graphql/usePost';
import { renderCommentHeader } from '../../../utils/renderCommentHeader';
import renderCommentItem from '../../../utils/renderCommentItem';
import Loading from '../../../utils/useLoading';
import { useCallback, useEffect, useMemo, useState } from 'react';

const PostComment = ({ item, userLevel }) => {
  const { id: userId, profileImageURL: userAvatar } = useAuthState();
  const [allComment, setAllComment] = useState(null);
  console.log('allComment', allComment);
  const [comment, setComment] = useState('');
  const [indexComment, setIndexComment] = useState(3);
  const postID = item?.id;

  const { isFetching, fetchedData, fetchError, refetch } = useGetAllPostComment(
    {
      postInfo: { postId: item ? item.id : '' },
    }
  );

  const [commentId, setCommentId] = useState('');

  const [replyToComment, setReplyToComment] = useState(null);
  const [replyComment, setReplyComment] = useState('');

  const {
    createComment,
    isFetchingComment,
    fetchedDataComment,
    fetchErrorComment,
  } = useCreateCommentLazy();

  useEffect(() => {
    setAllComment(fetchedData?.postInfo.comments);
  }, [fetchedData]);

  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await createComment({
          variables: {
            createCommentData: {
              userId,
              postId: postID,
              content: comment,
            },
          },
        });
      } catch (e) {
        throw e;
      }
      setComment('');
      refetch();
    },
    [comment, createComment, postID, refetch, userId]
  );

  const showMoreComment = () => {
    setIndexComment((prev) => prev + 2);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClickReply = (commentID) => {
    setCommentId(commentID);
    setReplyToComment(commentID);
  };

  const handleReplyCommentChange = (event) => {
    setReplyComment(event.target.value);
  };

  const handleSubmitRepyComment = useCallback(async () => {
    try {
      await createComment({
        variables: {
          createCommentData: {
            userId,
            postId: postID,
            content: replyComment,
            parentCommentId: commentId,
          },
        },
      });
    } catch (e) {
      throw e;
    }
    setReplyComment('');
    refetch();
    setReplyToComment(null);
  }, [refetch, createComment, userId, postID, replyComment, commentId]);

  return useMemo(
    () => (
      <>
        <div className="comments-wrapper">
          {renderCommentHeader(
            'comment',
            userAvatar,
            40,
            comment,
            postID,
            handleCommentChange,
            handleSubmitComment,
            25
          )}
          <div className="comment-list">
            {allComment &&
              renderCommentItem(
                allComment,
                indexComment,
                userLevel,
                handleClickReply,
                replyToComment,
                userAvatar,
                replyComment,
                commentId,
                handleReplyCommentChange,
                handleSubmitRepyComment
              )}
            {allComment?.length > 3 && allComment?.length > indexComment ? (
              <div className="View-more-comments" onClick={showMoreComment}>
                More comments
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Loading loading={isFetchingComment} />
      </>
    ),
    [
      userAvatar,
      comment,
      postID,
      handleSubmitComment,
      allComment,
      indexComment,
      userLevel,
      replyToComment,
      replyComment,
      commentId,
      handleSubmitRepyComment,
      isFetchingComment,
    ]
  );
};

export default PostComment;
