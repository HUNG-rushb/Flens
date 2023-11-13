import { useAuthState } from '../../../context/AuthContext';
import {
  useGetAllPostComment,
  useCreateCommentLazy,
} from '../../../graphql/usePost';
import { renderCommentHeader } from '../../../utils/renderCommentHeader';
import { relativeDays } from '../../../utils/unixToDateTime';
import Loading from '../../../utils/useLoading';
import { useCallback, useEffect, useMemo, useState } from 'react';

const PostComment = ({ item, userLevel }) => {
  const { id: userId, profileImageURL: userAvatar } = useAuthState();
  const [allComment, setAllComment] = useState(null);
  const [comment, setComment] = useState('');
  const [indexComment, setIndexComment] = useState(3);
  const commentID = item?.id;

  const { isFetching, fetchedData, fetchError, refetch } = useGetAllPostComment(
    {
      postInfo: { postId: item ? item.id : '' },
    }
  );

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
              postId: item?.id,
              // storyId: '000000000000000000000000',
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
    [comment, createComment, item?.id, refetch, userId]
  );

  const showMoreComment = () => {
    setIndexComment((prev) => prev + 2);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClickReply = (commentId) => {
    setReplyToComment(commentId);
  };

  const handleReplyCommentChange = (event) => {
    setReplyComment(event.target.value);
  };

  const reply = {
    avatar: userAvatar,
    content: replyComment,
    date: 'todayssss',
    username: 'username',
  };
  const handleSubmitRepyComment = () => {
    // handle submit reply comment
    setReplyToComment(null);
  };

  const handleClickReplyToReply = () => {
    //handle click reply to reply
  };

  return useMemo(
    () => (
      <>
        <div className="comments-wrapper">
          {renderCommentHeader(
            'comment',
            userAvatar,
            40,
            comment,
            commentID,
            handleCommentChange,
            handleSubmitComment,
            25
          )}
          <div className="comment-list">
            {allComment &&
              allComment.slice(0, indexComment).map((i, index) => (
                <div className="comment-wrapper" key={index + i.id}>
                  <img
                    src={i.userId.profileImageURL}
                    id="comment-avatar"
                    height={40}
                    width={40}
                    alt=""
                  />
                  <span id="comment-username">
                    {i.userId.name} <span id="user-level">{userLevel}</span>
                  </span>
                  <div id="comment-content">{i.content}</div>
                  <div className="comment-infor">
                    <span
                      id="reply-text"
                      onClick={() => handleClickReply(i.id)}
                    >
                      Reply
                    </span>
                    <span id="comment-date">{relativeDays(i.createdAt)}</span>
                  </div>
                  {replyToComment === i.id &&
                    renderCommentHeader(
                      'reply-comment',
                      userAvatar,
                      30,
                      replyComment,
                      commentID,
                      handleReplyCommentChange,
                      handleSubmitRepyComment,
                      20
                    )}

                  {!replyToComment && (
                    <div className="reply-comment-wrapper">
                      <img
                        src={reply.avatar}
                        id="comment-avatar"
                        height={30}
                        width={30}
                        alt=""
                      />
                      <span id="comment-username">
                        {reply.username}{' '}
                        <span id="user-level">{userLevel}</span>
                      </span>
                      <div id="reply-comment-content">{reply.content}</div>
                      <div className="reply-comment-infor">
                        <span
                          id="reply-text"
                          onClick={() => handleClickReplyToReply(i.id)}
                        >
                          Reply
                        </span>
                        <span id="comment-date">{reply.date}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

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
      commentID,
      handleSubmitComment,
      allComment,
      indexComment,
      isFetchingComment,
      userLevel,
      replyToComment,
      replyComment,
      reply.avatar,
      reply.username,
      reply.content,
      reply.date,
    ]
  );
};

export default PostComment;
