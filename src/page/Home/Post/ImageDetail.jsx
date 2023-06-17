import HashTag from './HashTag.jsx';
import './ImageDetail.css';
import PostComment from './PostComment';
import PostInteraction from './PostInteraction.jsx';
import PostTeachnicalInformation from './PostTeachnicalInformation.jsx';

const ImageDetail = ({ item, showImageDetail, handleCloseImageDetail }) => {
  return (
    <>
      <div className="image-detail-overlay" hidden={!showImageDetail}>
        <div className="detail-page">
          <div className="left-image-detail-page">
            <img src={item.image} alt="imageDetail" width={'100%'} />
          </div>
          <div className="right-image-detail-page">
            <div className="close-overlay" onClick={handleCloseImageDetail}>
              X
            </div>
            <div className="right-image-detail">
              <div className="image-detail-page-header">
                <img src={item.avatar} alt="avatar" width={'50px'} />
                <span>{item.name}</span>
              </div>
              <PostInteraction item={item}/>
              <PostTeachnicalInformation
                item={item}
                showImageDetail={showImageDetail}
              />
              <hr style={{ border: '1px solid #F08080' }} />
              <span>
                <b>Published {item.time} with “hashtag1”</b>
              </span>
              <HashTag item={item} />
              <PostComment item={item} showImageDetail={showImageDetail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDetail;
