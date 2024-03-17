import { useAuthState } from '../../../context/AuthContext';
import { useInteractPost } from '../../../graphql/usePost';
import { useUpdatePointPostingLazy } from '../../../graphql/usePost';
import { successfullNoty } from '../../../utils/useNotify';
import copy from 'clipboard-copy';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Heart, HeartFill, Reply } from 'react-bootstrap-icons';

const PostInteraction = ({ item }) => {
  const { id: userId } = useAuthState();
  const [isLiked, setIsLiked] = useState(item?.userLikedPost.includes(userId));
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(item?.points);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const { interactPost } = useInteractPost();
  const { updateLevel } = useUpdatePointPostingLazy();

  const handleLikePost = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const a = await interactPost({
          variables: {
            interactPostData: {
              postId: item?.id,
              likedUserId: userId,
              isLiked: !isLiked,
            },
          },
        });
        setIsLiked(!isLiked);
        setCountNumberOfLikes(a.data.interactPost.points);

        await updateLevel({
          variables: {
            updatePointPostingData: {
              userId: item.userId.id,
              xp: isLiked ? -1 : 1,
            },
          },
        });
      } catch (e) {
        throw e;
      }
      setAnimationWhenClick(true);
    },
    [interactPost, isLiked, item?.id, item?.userId.id, updateLevel, userId]
  );

  const renderReplyIcon = useCallback(() => {
    const link = `${window.location.origin}/post/${item?.id}`;
    const handleCopyClick = async () => {
      try {
        await copy(link);
        successfullNoty('Copied this link post to Clipboard!!!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    };

    return <Reply size={30} id="reply-icon" onClick={handleCopyClick} />;
  }, [item?.id]);

  useEffect(() => {
    if (animationWhenClick) {
      setTimeout(() => {
        setAnimationWhenClick(false);
      }, 1000);
    }
  }, [animationWhenClick]);

  return useMemo(
    () => (
      <div>
        <div className="post-interaction">
          <div className="heart-icon-wrapper" onClick={handleLikePost}>
            {isLiked === false ? (
              <Heart
                id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
                size={25}
              />
            ) : (
              <HeartFill
                id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
                color="red"
                size={25}
              />
            )}
            <span id="likes-number">{countNumberOfLikes}</span>
          </div>
          {renderReplyIcon()}
        </div>
        <hr style={{ border: '1px solid #F08080' }} />
      </div>
    ),
    [
      handleLikePost,
      isLiked,
      animationWhenClick,
      countNumberOfLikes,
      renderReplyIcon,
    ]
  );
};

export default PostInteraction;
