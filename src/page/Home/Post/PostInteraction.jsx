import { useAuthState } from '../../../context/AuthContext';
import { useDeletePost } from '../../../graphql/usePost';
import { useInteractPost } from '../../../graphql/usePost';
import { useEffect, useRef, useState } from 'react';
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
  showImageDetail,
  setImageToReport,
  showReport,
  toggleShowReport,
  handleDeletePost,
}) => {
  const { id: userId } = useAuthState();
  const clickOutsideRef = useRef(null);

  const [isLiked, setIsLiked] = useState(item?.userLikedPost.includes(userId));
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(item?.points);

  const [showListOtherActions, setShowListOtherActions] = useState(true);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const { deletePost } = useDeletePost();
  const { interactPost } = useInteractPost();

  const handleClickLikePost = async (event) => {
    event.preventDefault();

    try {
      const a = await interactPost({
        variables: {
          interactPostData: {
            postId: item.id,
            likedUserId: userId,
            isLiked: !isLiked,
          },
        },
      });
      setIsLiked(!isLiked);
      setCountNumberOfLikes(a.data.interactPost.points);
    } catch (e) {
      throw e;
    }
    setAnimationWhenClick(true);
  };

  const handleClickReport = () => {
    setShowListOtherActions(true);
    setImageToReport(item?.image.url);
    toggleShowReport(showReport);
  };

  const handleClickDeletePost = async (event) => {
    event.preventDefault();

    try {
      await deletePost({
        variables: {
          deletePostData: {
            postId: item.id,
          },
        },
      });

      handleDeletePost(true);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListOtherActions(true);
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

  return (
    <>
      <div
        className={!showImageDetail ? 'post-interaction' : 'post-interaction-2'}
        ref={clickOutsideRef}
      >
        <div className="like-icon" onClick={handleClickLikePost}>
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
          <span>{countNumberOfLikes}</span>
        </div>

        <div className="right-action">
          <Reply size={30} className="reply-icon" />
          <ThreeDots
            size={30}
            onClick={() => setShowListOtherActions((prev) => !prev)}
            className="otherAction"
          />
          <div className="list-other-actions" hidden={showListOtherActions}>
            <ul>
              <li onClick={handleClickReport}>
                <Flag color="blue" />
                Report
              </li>

              <li onClick={handleClickDeletePost}>
                <Trash color="red" />
                Delete this photo
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr style={{ border: '1px solid #F08080' }} />
    </>
  );
};

export default PostInteraction;
