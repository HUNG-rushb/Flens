import Header from '../../../components/Header/Header.jsx';
import './ImageDetail.scss';
import PostComment from './PostComment';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageDetail = ({ item, showDetail }) => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [scale, setScale] = useState(1);
  const [cursor, setCursor] = useState('zoom-in');
  const navigate = useNavigate();

  const handleImageClick = useCallback(() => {
    setZoomedIn(!zoomedIn);
    if (zoomedIn) {
      setScale(1);
      setCursor('zoom-in');
    } else {
      setScale(1.4);
      setCursor('zoom-out');
    }
  }, [zoomedIn]);

  const handleMouseMove = useCallback(
    (e) => {
      if (zoomedIn) {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { width, height } = target;
        const xPercentage = (offsetX / width) * 100;
        const yPercentage = (offsetY / height) * 100;
        target.style.transformOrigin = `${xPercentage}% ${yPercentage}%`;
      }
    },
    [zoomedIn]
  );

  const handleClickTag = useCallback(
    (tag) => {
      navigate(`/search/${tag}`, {
        state: {
          tagValue: tag,
        },
      });
    },
    [navigate]
  );

  return useMemo(
    () => (
      <div className="image-detail-container">
        <div className="left-content">
          <div
            className={`left-content-wrapper ${zoomedIn ? 'zoomed-in' : ''}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            style={{ cursor: cursor }}
          >
            <img
              id="main-image"
              src={item?.image.url}
              style={{ transform: `scale(${scale})` }}
              alt=""
            />
          </div>
        </div>
        <div className="right-content">
          <Header type="post" item={item} />
          <div style={{ padding: '0 10px' }}>
            <div className="title">{item?.title}</div>
            <div
              className="caption"
              style={{ fontSize: 16 }}
            >
              {item?.caption}
            </div>
            <div className="hash-tags">
              {item?.tag.map((tag, index) => (
                <span id="tag" key={index} onClick={() => handleClickTag(tag)}>
                  #{tag}
                </span>
              ))}
            </div>
            <PostInteraction item={item} showImageDetail={showDetail} />
            <PostTechnical item={item} showImageDetail={showDetail} />
            <hr style={{ border: '1px solid #F08080', padding:"0 10px" }} />
            <PostComment item={item} />
          </div>
        </div>
      </div>
    ),
    [
      cursor,
      handleClickTag,
      handleImageClick,
      handleMouseMove,
      item,
      scale,
      showDetail,
      zoomedIn,
    ]
  );
};
export default ImageDetail;
