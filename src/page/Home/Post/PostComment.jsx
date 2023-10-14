import Textarea from '../../../components/TextArea/Textarea';
import { useAuthState } from '../../../context/AuthContext';
import {
  useGetAllPostComment,
  useCreateCommentLazy, // useGetAllPostCommentLazy,
} from '../../../graphql/usePost';
import { relativeDays } from '../../../utils/unixToDateTime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const PostComment = ({ item }) => {
  const { id: userId, profileImageURL } = useAuthState();
  const [allComment, setAllComment] = useState(null);
  const [comment, setComment] = useState('');
  const [indexComment, setIndexComment] = useState(3);

  const commentid = item?.id;

  const { isFetching, fetchedData, fetchError, refetch } = useGetAllPostComment(
    {
      postInfo: { postId: item?.id },
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

  const handleKeyPress = useCallback(
    async (event) => {
      const textarea = document.getElementById(`textarea-comment-${commentid}`);
      const { selectionStart, selectionEnd } = textarea;
      const value = textarea.value;

      if (comment && event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmitComment(event);
      } else if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        const newValue =
          value.substring(0, selectionStart) +
          '\n' +
          value.substring(selectionEnd);
        textarea.value = newValue;

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        textarea.selectionStart = selectionStart + 1;
        textarea.selectionEnd = selectionStart + 1;
      } else if (
        event.key === 'Backspace' &&
        selectionStart === selectionEnd &&
        selectionStart > 0
      ) {
        event.preventDefault();
        const newValue =
          value.substring(0, selectionStart - 1) +
          value.substring(selectionEnd);
        textarea.value = newValue;

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        textarea.selectionStart = selectionStart - 1;
        textarea.selectionEnd = selectionStart - 1;
      }
    },
    [comment, commentid, handleSubmitComment]
  );

  return useMemo(
    () => (
      <form className="comments-wrapper" onSubmit={handleSubmitComment}>
        <div className="comment-header">
          <img src={profileImageURL} alt="" id="comment-avatar" />
          <Textarea
            type={'comment'}
            placeholder={'Add a comment'}
            id={`textarea-comment-${commentid}`}
            value={comment}
            rows={1}
            onChange={handleCommentChange}
            onKeyDown={handleKeyPress}
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
      commentid,
      handleKeyPress,
      handleSubmitComment,
      indexComment,
      profileImageURL,
    ]
  );
};

export default PostComment;
