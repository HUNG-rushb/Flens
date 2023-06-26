import TextareaCustom from '../../../components/TextArea/Textarea';
import {
  useGetAllPostComment,
  useCreateCommentLazy, // useGetAllPostCommentLazy,
} from '../../../graphql/usePost';
import { relativeDays } from '../../../utils/unixToDateTime';
import { useEffect, useState } from 'react';
import { Send, PersonCircle } from 'react-bootstrap-icons';

const PostComment = ({ item, showImageDetail }) => {
  const [allComment, setAllComment] = useState(null);
  const [comment, setComment] = useState('');
  const [indexCmt, setIndexCmt] = useState(3);

  const commentid = item.id

  const { isFetching, fetchedData, fetchError, refetch } = useGetAllPostComment(
    {
      postInfo: { postId: item.id },
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

  const showMoreCmt = () => {
    setIndexCmt((prev) => prev + 2);
  };

  const handlePressEnter = async (event) => {
    const textarea = document.getElementById(`textarea-comment-${commentid}`);
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
        {item.avatar? <img src={item.avatar} alt="avatar" /> : <PersonCircle size={40} color='#f08080' />}
        
        <TextareaCustom
          type={'comment'}
          placeholder={'Add a comment'}
          id={`textarea-comment-${commentid}`}
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
          allComment.slice(0, indexCmt).map((i, index) => (
            <div className="reply-comment" key={i.id}>
              <span>{i.name}</span>
              <div className="reply-comment-content">{i.content}</div>
              <div className="reply-comment-date">
                {relativeDays(i.createdAt)}
              </div>
            </div>
          ))}

        {allComment?.length > 3 && allComment?.length > indexCmt ? (
          <div className="View-more-comments" onClick={showMoreCmt}>
            View more
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PostComment;
