import TextArea from '../../../components/TextArea/TextArea';
import { useAuthState } from '../../../context/AuthContext';
import { useCreateCommentLazy } from '../../../graphql/usePost';
import { handleKeyPressComment } from '../../../utils/handleKeyPressComment';
// import { useGetAllStoryComment } from '../../../graphql/useStory';
import { relativeDays } from '../../../utils/unixToDateTime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const StoryComment = ({ item, refetchStory }) => {
  const { id: userId, profileImageURL } = useAuthState();
  const [allComment, setAllComment] = useState(null);
  const [comment, setComment] = useState('');
  const [indexComment, setIndexComment] = useState(3);
  const { createComment } = useCreateCommentLazy();

  // const { isFetching, fetchedData, fetchError } = useGetAllStoryComment({
  //   storyInfoData: { storyId: item?.id },
  // });

  useEffect(() => {
    setAllComment(item?.comments);
  }, [item]);

  const storyID = item?.id;

  const handleSubmitComment = useCallback(
    async (e) => {
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
    },
    [comment, createComment, item?.id, refetchStory, userId]
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
          <TextArea
            type={'comment'}
            placeholder={'Add a comment'}
            id={`textarea-comment-${storyID}`}
            value={comment}
            rows={1}
            onChange={handleCommentChange}
            onKeyDown={(event) =>
              handleKeyPressComment(
                event,
                storyID,
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
      handleSubmitComment,
      indexComment,
      profileImageURL,
      storyID,
    ]
  );
};

export default StoryComment;
