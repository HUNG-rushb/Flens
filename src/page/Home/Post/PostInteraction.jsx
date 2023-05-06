import ModalCustom from '../../../components/Modal/Modal';
import { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';
import Post from '../../../assets/images/post.jpg'

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
    return <>
    <div>
    <img src={Post} alt='imag' />;

      </div>
      <div>
        content
      </div>
      Report this photo with reason:</>
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
            <Heart size={25} />
          ) : (
            <HeartFill color="red" size={25} />
          )}
          <span>{countNumberOfLikes > 0 ? countNumberOfLikes : 0}</span>
        </div>
        <div className="right-action">
          <Reply size={30} className="reply-icon" />
          <div className="otherAction">
            <ThreeDots size={30} onClick={handleShowReport} />
            <ModalCustom
              show={showReport}
              size="lg"
              modalTitle=""
              modalContent={modalReportContent()}
              handleClose={handleCloseReport}
              confirmButtonMessage="Submit"
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
