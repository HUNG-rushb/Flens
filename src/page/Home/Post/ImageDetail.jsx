import './ImageDetail.scss';
import PostComment from './PostComment';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useState } from 'react';

const ImageDetail = ({ item, showDetail, handleCloseImageDetail }) => {
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
      <div className="image-detail-modal">
        <div className="image-detail-container">
          <div className="overlay" hidden={!showDetail}>
            <div className="container">
              <div className="content">
                <div className="left-content">
                  <div
                    className={`left-content-wrapper ${
                      zoomedIn ? 'zoomed-in' : ''
                    }`}
                    onClick={handleImageClick}
                    onMouseMove={handleMouseMove}
                    style={{ cursor: cursor }}
                  >
                    <img
                      id="main-image"
                      src={item?.image.url}
                      alt=""
                      style={{ transform: `scale(${scale})` }}
                    />
                  </div>
                </div>
                <div className="right-content">
                  <div
                    className="close-overlay"
                    onClick={handleCloseImageDetail}
                  >
                    X
                  </div>

                  <div className="right-content-wrapper">
                    <div className="header">
                      <img
                        id="avatar"
                        src={item?.userId.profileImageURL}
                        alt=""
                      />
                      <span id="username">{item?.userId.name}</span>
                    </div>
                    <div className="title">{item?.title}</div>
                    <div className="hash-tags">
                      {item?.tag.map((tag, index) => (
                        <span id="tag" key={index}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <PostInteraction
                      item={item}
                      showImageDetail={showDetail}
                    />
                    <PostTechnical
                      item={item}
                      showImageDetail={showDetail}
                    />
                    <hr style={{ border: '1px solid #F08080' }} />
                   
                    <PostComment item={item} />
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
