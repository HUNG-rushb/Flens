import ModalCustom from '../../../components/Modal/Modal';
import { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const PostInteraction = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(59);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const [showReport, setShowReport] = useState(false);

  const handleShowReport = () => {
    setShowListOtherActions(true)
    setShowReport(true);
  };

  const handleShowListOtherActions = (state) => {
    setShowListOtherActions(!state);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const modalReportContent = () => {
    console.log(item);
    const image = item.image;
    console.log('first,', image);
    return (
      <>
        <div className="report-photo-container">
          <img src={item.image} alt="" width={'50%'} />
          <div className='left-report-photo'>
            <span>Report this photo with reason:</span>
            <ul>
              <li><input type='checkbox'/> <span>Copyright infringement</span> </li>
              <li><input type='checkbox'/><span>Offensive content </span></li>
              <li><input type='checkbox'/><span>Spam</span></li>
              <li><input type='checkbox'/><span>Mature content</span></li>
              <li><input type='checkbox'/><span>Hamful content</span></li>
            </ul>
          </div>
        </div>
      </>
    );
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
          <ThreeDots
            size={30}
            onClick={() => handleShowListOtherActions(showListOtherActions)}
            className="otherAction"
          />

          <div className="list-other-actions" hidden={showListOtherActions}>
            <ul>
              <li onClick={handleShowReport}>Report</li>
            </ul>
          </div>
        </div>
        <ModalCustom
          show={showReport}
          size="lg"
          modalTitle="Report Photo"
          modalContent={modalReportContent()}
          handleClose={handleCloseReport}
          confirmButtonMessage="Submit"
          handleSavechanges={handleSaveReport}
        />
      </div>
      <hr style={{ border: '1px solid #F08080' }} />
    </>
  );
};

export default PostInteraction;
