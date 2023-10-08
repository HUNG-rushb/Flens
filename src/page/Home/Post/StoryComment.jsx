import TextareaCustom from '../../../components/TextArea/Textarea';
import { useAuthState } from '../../../context/AuthContext';
import { useCreateCommentLazy } from '../../../graphql/usePost';
// import { useGetAllStoryComment } from '../../../graphql/useStory';
import { relativeDays } from '../../../utils/unixToDateTime';
import { useEffect, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const StoryComment = ({ item, refetchStory }) => {
  const { id: userId, profileImageURL } = useAuthState();
  const [allComment, setAllComment] = useState(null);
  const [comment, setComment] = useState('');
  const [indexComment, setIndexComment] = useState(3);


  console.log({ item });

  const { createComment } = useCreateCommentLazy();

  // const { isFetching, fetchedData, fetchError } = useGetAllStoryComment({
  //   storyInfoData: { storyId: item?.id },
  // });

  useEffect(() => {
    setAllComment(item?.comments);
  }, [item]);

  const storyID = item?.id;

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await createComment({
        variables: {
          createCommentData: {
            userId,
            postId: '000000000000000000000000',
            storyId: item?.id,
            content: comment,
          },
        },
      });
    } catch (e) {
      throw e;
    }
    setComment('');
    refetchStory();
  };

  const showMoreComment = () => {
    setIndexComment((prev) => prev + 2);
  };

  const handleKeyPress = async (event) => {
    event.preventDefault();
    const textarea = document.getElementById(`textarea-comment-${storyID}`);
    const { selectionStart, selectionEnd } = textarea;
    const value = textarea.value;

    if (event.key === 'Enter' && !event.shiftKey) {
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
        value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
      textarea.value = newValue;

      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';

      textarea.selectionStart = selectionStart - 1;
      textarea.selectionEnd = selectionStart - 1;
    } else {
      setComment(event.target.value);
    }
  }; 

  return (
    <div className="comments-wrapper">
      <div className="comment-header">
        <img src={profileImageURL} alt="" id="comment-avatar" />
        <TextareaCustom
          type={'comment'}
          placeholder={'Add a comment'}
          id={`textarea-comment-${storyID}`}
          value={comment}
          rows={1}
          onChange={(e) => handleKeyPress(e)}
        />
        <button type="submit" id="submit-button" onClick={handleSubmitComment}>
          <Send size={25} id="send-icon" />
        </button>
      </div>

      <div className="comment-list">
        {allComment &&
          allComment.slice(0, indexComment).map((i, index) => (
            <div className="comment-wrapper" key={i.id}>
              <img src={i.userId.profileImageURL} alt="" id="comment-avatar" />
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
    </div>
  );
};

export default StoryComment;
