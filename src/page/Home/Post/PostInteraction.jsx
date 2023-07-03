import {
  Flag,
  Heart,
  Trash,
  Reply,
  ThreeDots,
  HeartFill,
} from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react';

const PostInteraction = ({
  item,
  showImageDetail,
  setImageToReport,
  showReport,
  toggleShowReport,
}) => {
  const clickOutsideRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showListOtherActions, setShowListOtherActions] = useState(true);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(item?.points);

  const handleClickLikePost = () => {
    setIsLiked(!isLiked);
    if (isLiked === false) setCountNumberOfLikes(countNumberOfLikes + 1);
    else setCountNumberOfLikes(countNumberOfLikes - 1);
  };

  const handleClickReport = () => {
    setShowListOtherActions(true);
    setImageToReport(item?.image.url);
    toggleShowReport(showReport);
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

  return (
    <>
      <div
        className={!showImageDetail ? 'post-interaction' : 'post-interaction-2'}
        ref={clickOutsideRef}
      >
        <div className="like-icon" onClick={handleClickLikePost}>
          {isLiked === false ? (
            <Heart size={25} />
          ) : (
            <HeartFill color="red" size={25} />
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
              <li>
                <Trash color="red" />
                Delete photo
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
