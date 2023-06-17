import TextareaCustom from '../../../components/TextArea/Textarea';
import {
  useGetAllPostComment,
  useCreateCommentLazy,
  useGetAllPostCommentLazy,
} from '../../../graphql/usePost';
import { useEffect, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const PostComment = ({ item, showImageDetail }) => {
  const { isFetching, fetchedData, fetchError, refetch } = useGetAllPostComment(
    {
      postInfo: { postId: item.id },
    }
  );
  const [allComment, setAllComment] = useState(null);

  useEffect(() => {
    setAllComment(fetchedData?.postInfo.comments);
  }, [fetchedData]);

  const {
    createComment,
    isFetchingComment,
    fetchedDataComment,
    fetchErrorComment,
  } = useCreateCommentLazy();

  const [comment, setComment] = useState('');

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await createComment({
        variables: {
          createCommentData: {
            userId: '6482134d9fa3fbb056c8d2fc',
            postId: item.id,
            content: comment,
          },
        },
      });
    } catch (e) {
      throw e;
    }
    setComment('');
    refetch();
  };

  const handlePressEnter = async (event) => {
    const textarea = document.getElementById('textarea-comment');
    const { selectionStart, selectionEnd } = textarea;
    const value = textarea.value;
    if (event.key === 'Enter') {
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
        value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
      textarea.value = newValue;

      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';

      textarea.selectionStart = selectionStart - 1;
      textarea.selectionEnd = selectionStart - 1;
    }
  };

  return (
    <div className="post-comments">
      <div className="post-comment-header">
        <img src={item.avatar} alt="avatar-comment" width="40" />
        <TextareaCustom
          type={'comment'}
          placeholder={'Add a comment'}
          id="textarea-comment"
          value={comment}
          rows={1}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
        />

        <button type="submit" id="btn-submit-cmt" onClick={handleSubmitComment}>
          <Send size={25} />
        </button>
      </div>

      <div className="list-reply-comments">
        {allComment &&
          allComment.map((i, index) => (
            <div className="reply-comment" key={i.id}>
              <span>{i.name}</span>
              <div className="reply-comment-content">{i.content}</div>
              <div className="reply-comment-date">{i.createdAt}</div>
            </div>
          ))}

        {/* {item.comments.length > 1 ? (
          <div className="View-more-comments">
            View more {item.comments.length} comments ...
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default PostComment;
