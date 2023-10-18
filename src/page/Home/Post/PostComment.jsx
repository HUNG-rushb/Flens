import Textarea from '../../../components/TextArea/Textarea';
import { useAuthState } from '../../../context/AuthContext';
import {
  useGetAllPostComment,
  useCreateCommentLazy, // useGetAllPostCommentLazy,
} from '../../../graphql/usePost';
import { handleKeyPressComment } from '../../../utils/handleKeyPressComment';
import { relativeDays } from '../../../utils/unixToDateTime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const PostComment = ({ item }) => {
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
              storyId: '000000000000000000000000',
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

  return useMemo(
    () => (
      <form className="comments-wrapper" onSubmit={handleSubmitComment}>
        <div className="comment-header">
          <img src={profileImageURL} alt="" id="comment-avatar" />
          <Textarea
            type={'comment'}
            placeholder={'Add a comment'}
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
          <button id="submit-button" type="submit">
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
                <span id="comment-username">{i.userId.name}</span>
                <div id="comment-content">{i.content}</div>
                <div id="comment-date">{relativeDays(i.createdAt)}</div>
              </div>
            ))}

          {allComment?.length > 3 && allComment?.length > indexComment ? (
            <div className="View-more-comments" onClick={showMoreComment}>
              View more
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    ),
    [
      allComment,
      comment,
      commentID,
      handleSubmitComment,
      indexComment,
      profileImageURL,
    ]
  );
};

export default PostComment;
