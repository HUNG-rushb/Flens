import HashTag from './HashTag.jsx';
import './ImageDetail.css';
import PostComment from './PostComment';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useState } from 'react';

const ImageDetail = ({ item, showImageDetail, handleCloseImageDetail }) => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [scale, setScale] = useState(1);
  const [cursor, setCursor] = useState('zoom-in');

  const handleImageClick = () => {
    setZoomedIn(!zoomedIn);
    if (zoomedIn) {
      setScale(1);
      setCursor('zoom-in');
    } else {
      setScale(1.4);
      setCursor('zoom-out');
    }
  };

  const handleMouseMove = (e) => {
    if (zoomedIn) {
      const { offsetX, offsetY, target } = e.nativeEvent;
      const { width, height } = target;
      const xPercentage = (offsetX / width) * 100;
      const yPercentage = (offsetY / height) * 100;
      target.style.transformOrigin = `${xPercentage}% ${yPercentage}%`;
    }
  };
  return (
    <>
      <div className="image-detail-page">
        <div className="image-detail-content">
          <div className="modal-detail-image-overlay" hidden={!showImageDetail}>
            <div className="modal-detail-image-container">
              <div className="modal-detail-image-content">
                <div className="modal-detail-image-left">
                  <div
                    className={`image-detail-information-container ${
                      zoomedIn ? 'zoomed-in' : ''
                    }`}
                    onClick={handleImageClick}
                    onMouseMove={handleMouseMove}
                    style={{ cursor: cursor }}
                  >
                    <img
                      id="image-detail-information"
                      src={item?.image.url}
                      alt=""
                      style={{ transform: `scale(${scale})` }}
                    />
                  </div>
                </div>
                <div className="modal-detail-image-right">
                  <div
                    className="close-overlay"
                    onClick={handleCloseImageDetail}
                  >
                    X
                  </div>

                  <div className="image-detail-right-container">
                    <div className="image-detail-page-header">
                      <img
                        id="image-detail-avatar"
                        src={item?.userId.profileImageURL}
                        alt="avatar"
                      />
                      <span>{item?.userId.name}</span>
                    </div>
                    <div className="image-detail-title">{item?.title}</div>
                    <PostInteraction
                      item={item}
                      showImageDetail={showImageDetail}
                    />
                    <PostTechnical
                      item={item}
                      showImageDetail={showImageDetail}
                    />
                    <hr style={{ border: '1px solid #F08080' }} />
                    {/* <HashTag item={item} /> */}
                    {/* <PostComment
                      item={item}
                      showImageDetail={showImageDetail}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageDetail;
