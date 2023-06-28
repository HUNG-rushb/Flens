import HashTag from './HashTag.jsx';
import './ImageDetail.css';
import PostComment from './PostComment';
import PostInteraction from './PostInteraction.jsx';
import PostTeachnicalInformation from './PostTeachnicalInformation.jsx';

const ImageDetail = ({ item, showImageDetail, handleCloseImageDetail }) => {
  return (
    <>
      <div className="image-detail-page">
        <div className="image-detail-content">
          <div className="modal-detail-image-overlay" hidden={!showImageDetail}>
            <div className="modal-detail-image-container">
              <div className="modal-detail-image-content">
                <div className="modal-detail-image-left">
                  <img src={item.image.url} alt="" />
                </div>
                <div className="modal-detail-image-right">
                  <div
                    className="close-overlay"
                    onClick={handleCloseImageDetail}
                  >
                    X
                  </div>
                  <div className="image-detail-page-header">
                    <img src={item.userId.profileImageURL} alt="avatar" />
                    <span>{item.userId.name}</span>
                  </div>
                  <div className="image-detail-title">{item.title}</div>
                  <PostInteraction
                    item={item}
                    showImageDetail={showImageDetail}
                  />
                  <PostTeachnicalInformation
                    item={item}
                    showImageDetail={showImageDetail}
                  />
                  <hr style={{ border: '1px solid #F08080' }} />
                  {/* <HashTag item={item} /> */}
                  <PostComment item={item} showImageDetail={showImageDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="image-detail-overlay" hidden={!showImageDetail}>
        <div className="detail-page">
          <div className="left-image-detail-page">
            <img src={item.image.url} alt="" />
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

              <PostInteraction item={item} />

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
      </div> */
}

export default ImageDetail;
