import ModalReportImage from '../../../components/Modal/ModalReportImage';
import { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const PostInteraction = ({ item, showImageDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(59);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const [showReport, setShowReport] = useState(false);

  const handleShowReport = () => {
    setShowListOtherActions(true);
    setShowReport(true);
  };

  const handleShowListOtherActions = (state) => {
    setShowListOtherActions(!state);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const handleSaveReport = () => {
    setShowReport(false);
  };

  const handleClickLikePost = () => {
    setIsLiked(!isLiked);
    if (isLiked === false) setCountNumberOfLikes(countNumberOfLikes + 1);
    else setCountNumberOfLikes(countNumberOfLikes - 1);
  };

  return (
    <>
      <div
        className={!showImageDetail ? 'post-interaction' : 'post-interaction-2'}
      >
        <div className="like-icon" onClick={handleClickLikePost}>
          {isLiked === false ? (
            <Heart size={25} />
          ) : (
            <HeartFill color="red" size={25} />
          )}
          <span>{item.points}</span>
        </div>
        <div className="right-action">
          <Reply size={30} className="reply-icon" />
          <ThreeDots
            size={30}
            onClick={() => handleShowListOtherActions(showListOtherActions)}
            className="otherAction"
          />

          <div className="list-other-actions" hidden={showListOtherActions}>
            <ul>
              <li onClick={handleShowReport}>Report</li>
              <li >Delete photo</li>
            </ul>
          </div>
        </div>

        <ModalReportImage
          item={item}
          show={showReport}
          handleClose={handleCloseReport}
          handleSavechanges={handleSaveReport}
        />
      </div>
      <hr style={{ border: '1px solid #F08080' }} />
    </>
  );
};

export default PostInteraction;
