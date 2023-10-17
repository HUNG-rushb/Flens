import { useAuthState } from '../../../context/AuthContext';
import { useDeletePost } from '../../../graphql/usePost';
import { useInteractPost } from '../../../graphql/usePost';
import { useUpdatePointPostingLazy } from '../../../graphql/usePost';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Flag,
  Heart,
  Trash,
  Reply,
  ThreeDots,
  HeartFill,
} from 'react-bootstrap-icons';

const PostInteraction = ({
  item,
  setImageToReport,
  showReport,
  toggleShowReport,
  setIsDeletedPost,
}) => {
  const { id: userId } = useAuthState();
  const clickOutsideRef = useRef(null);

  const [isLiked, setIsLiked] = useState(item?.userLikedPost.includes(userId));
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(item?.points);

  const [showListActions, setShowListActions] = useState(true);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const { deletePost } = useDeletePost();
  const { interactPost } = useInteractPost();
  const { updateLevel } = useUpdatePointPostingLazy();
  console.log({ item });

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
    [interactPost, isLiked, item?.id, userId]
  );

  const handleReportImage = useCallback(() => {
    setShowListActions(true);
    setImageToReport(item?.image.url);
    toggleShowReport(showReport);
  }, [item?.image.url, setImageToReport, showReport, toggleShowReport]);

  const handleDeletePost = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await deletePost({
          variables: {
            deletePostData: {
              postId: item?.id,
            },
          },
        });

        setIsDeletedPost(true);
      } catch (e) {
        throw e;
      }
    },
    [deletePost, setIsDeletedPost, item?.id]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListActions(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="post-interaction" ref={clickOutsideRef}>
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

          <div className="right-action-wrapper">
            <Reply size={30} id="reply-icon" />
            <ThreeDots
              size={30}
              onClick={() => setShowListActions((prev) => !prev)}
              id="other-action-icon"
            />
            <div className="list-actions" hidden={showListActions}>
              <ul>
                <li onClick={handleReportImage}>
                  <Flag color="blue" />
                  Report
                </li>

                <li onClick={handleDeletePost}>
                  <Trash color="red" />
                  Delete this photo
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr style={{ border: '1px solid #F08080' }} />
      </div>
    ),
    [
      animationWhenClick,
      countNumberOfLikes,
      handleDeletePost,
      handleReportImage,
      handleLikePost,
      isLiked,
      showListActions,
    ]
  );
};

export default PostInteraction;
