import Textarea from '../../../components/Textarea/Textarea';
import { useAuthState } from '../../../context/AuthContext';
import {
  useGetAllPostComment,
  useCreateCommentLazy, // useGetAllPostCommentLazy,
} from '../../../graphql/usePost';
import { handleKeyPressComment } from '../../../utils/handleKeyPressComment';
import { relativeDays } from '../../../utils/unixToDateTime';
import Loading from '../../../utils/useLoading';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const PostComment = ({ item, userLevel }) => {
  const { id: userId, profileImageURL } = useAuthState();
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
    avatar: profileImageURL,
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
      <div className="comments-wrapper">
        <div className="comment-header">
          <img src={profileImageURL} alt="" id="comment-avatar" />
          <Textarea
            type="comment"
            placeholder="Add a comment"
            id={`textarea-comment-${commentID}`}
            value={comment}
            rows={1}
            onChange={handleCommentChange}
            onKeyDown={(event) =>
              handleKeyPressComment(
                event,
                commentID,
                comment,
                handleSubmitComment
              )
            }
          />
          <button id="submit-button" onClick={handleSubmitComment}>
            <Send size={25} id="send-icon" />
          </button>
        </div>

        <div className="comment-list">
          {allComment &&
            allComment.slice(0, indexComment).map((i, index) => (
              <div className="comment-wrapper" key={i.id}>
                <img
                  src={i.userId.profileImageURL}
                  alt=""
                  id="comment-avatar"
                />
                <span id="comment-username">
                  {i.userId.name} <span id="user-level">{userLevel}</span>
                </span>
                <div id="comment-content">{i.content}</div>
                <div className="comment-infor">
                  <span id="reply-text" onClick={() => handleClickReply(i.id)}>
                    Reply
                  </span>
                  <span id="comment-date">{relativeDays(i.createdAt)}</span>
                </div>
                {replyToComment === i.id && (
                  <div className="reply-comment-header">
                    <img
                      src={profileImageURL}
                      alt=""
                      id="reply-comment-avatar"
                    />
                    <Textarea
                      type="reply-comment"
                      placeholder="Add a comment"
                      id={`textarea-comment-${commentID}`}
                      value={replyComment}
                      rows={1}
                      onChange={handleReplyCommentChange}
                      onKeyDown={(event) =>
                        handleKeyPressComment(
                          event,
                          commentID,
                          replyComment,
                          handleSubmitRepyComment
                        )
                      }
                    />
                    <button
                      id="submit-button"
                      onClick={handleSubmitRepyComment}
                    >
                      <Send size={20} id="send-icon" />
                    </button>
                  </div>
                )}
                {!replyToComment && <div className="reply-comment-wrapper">
                  <img src={reply.avatar} alt="" id="reply-comment-avatar" />
                  <span id="reply-comment-username">
                    {reply.username} <span id="user-level">{userLevel}</span>
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
                </div>}
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
    ),
    [
      profileImageURL,
      commentID,
      comment,
      handleSubmitComment,
      allComment,
      indexComment,
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
