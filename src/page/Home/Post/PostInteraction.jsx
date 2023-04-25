import ModalCustom from '../../../components/Modal/Modal';
import { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const PostInteraction = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(59);

  const [showReport, setShowReport] = useState(false);

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const modalReportContent = () => {
    return <>Report this photo with reason:</>;
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
      <div className="post-interaction">
        <div className="like-icon" onClick={handleClickLikePost}>
          {isLiked === false ? (
            <Heart size={30} />
          ) : (
            <HeartFill color="red" size={30} />
          )}
          <span>{countNumberOfLikes > 0 ? countNumberOfLikes : 0}</span>
        </div>
        <div className="right-action">
          <Reply size={30} className="reply-icon" />
          <div className="otherAction">
            <ThreeDots size={30} onClick={handleShowReport} />
            <ModalCustom
              show={showReport}
              size="md"
              modalTitle="Report Post"
              modalContent={modalReportContent()}
              handleClose={handleCloseReport}
              handleSavechanges={handleSaveReport}
            />
          </div>
        </div>
      </div>
      <hr style={{ border: '1px solid #F08080' }} />
    </>
  );
};

export default PostInteraction;
