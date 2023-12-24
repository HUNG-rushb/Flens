import HeaderPost from '../../../components/Header/Header.jsx';
import Modal from '../../../components/Modal/Modal.jsx';
import useModal from '../../../hooks/useModal.jsx';
import ImageDetail from './ImageDetail.jsx';
import './Post.scss';
import PostComment from './PostComment.jsx';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useCallback, useMemo, useState } from 'react';
import { Camera2, X } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const Post = ({ item, setReportedList }) => {
  const navigate = useNavigate();
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [showTechnicalInfor, setShowTechnicalInfor] = useState(false);
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { isShowing: showModal, toggle: toggleShow } = useModal();

  const handleViewDetail = useCallback(() => {
    setItemShowDetail(item);
    toggleShow();
  }, [item, setItemShowDetail, toggleShow]);

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
      <>
        {isDeletedPost ? (
          <></>
        ) : (
          <div className="posts-wrapper">
            <HeaderPost
              item={item}
              setIsDeleted={setIsDeletedPost}
              setReportedList={setReportedList}
            />

            <div className="post-content-wrapper">
              <div className="post-content">
                <div className="image-wrapper">
                  <img
                    id="image-post"
                    src={item.image.url}
                    onClick={handleViewDetail}
                    alt=""
                  />
                  <div
                    className={`technical-container ${
                      showTechnicalInfor ? 'slide-in' : 'slide-out'
                    }`}
                  >
                    <PostTechnical
                      item={item}
                      showImageDetail={showModal}
                      showTechnicalInfor={showTechnicalInfor}
                    />
                  </div>
                  <div className="technical-infor-icon">
                    {!showTechnicalInfor ? (
                      <Camera2
                        size={25}
                        color="#f08080"
                        onClick={() => setShowTechnicalInfor(true)}
                      />
                    ) : (
                      <X
                        size={28}
                        color="#f08080"
                        onClick={() => setShowTechnicalInfor(false)}
                      />
                    )}
                  </div>
                </div>

                <div className="post-title">{item.title}</div>
                <div>{item.caption}</div>
                <div className="hash-tags">
                  {item.tag.map((tag, index) => (
                    <span
                      id="tag"
                      key={index}
                      onClick={() => handleClickTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <PostInteraction item={item} />
                {item && (
                  <PostComment
                    item={item}
                    userLevel={item.userId.level.currentLevel}
                  />
                )}
              </div>
            </div>
            <Modal
              show={showModal}
              modalContent={
                <ImageDetail item={itemShowDetail} showDetail={showModal} />
              }
              handleClose={toggleShow}
              hideButton={true}
              size="xl"
            />
          </div>
        )}
      </>
    ),
    [
      handleClickTag,
      handleViewDetail,
      isDeletedPost,
      item,
      itemShowDetail,
      setReportedList,
      showModal,
      showTechnicalInfor,
      toggleShow,
    ]
  );
};

export default Post;
