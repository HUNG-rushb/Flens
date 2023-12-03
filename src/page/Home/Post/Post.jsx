import HeaderPost from '../../../components/Header/Header.jsx';
import './Post.scss';
import PostComment from './PostComment.jsx';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useCallback, useMemo, useState } from 'react';
import { Camera2, X } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const Post = ({
  item,
  showImageDetail,
  toggleImageDetail,
  setItemShowDetail,
  setReportedList,
}) => {
  const navigate = useNavigate();
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [showTechnicalInfor, setShowTechnicalInfor] = useState(false);

  const handleViewDetail = useCallback(() => {
    setItemShowDetail(item);
    toggleImageDetail();
  }, [item, setItemShowDetail, toggleImageDetail]);

  const handleClickTag = useCallback(
    (tag) => {
      navigate('/explore/inspiration', {
        state: {
          tagValue: tag,
        },
      });
    },
    [navigate]
  );

  console.log(item, 'post');

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
                      showImageDetail={showImageDetail}
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
          </div>
        )}
      </>
    ),
    [
      handleClickTag,
      handleViewDetail,
      isDeletedPost,
      item,
      setReportedList,
      showImageDetail,
      showTechnicalInfor,
    ]
  );
};

export default Post;
