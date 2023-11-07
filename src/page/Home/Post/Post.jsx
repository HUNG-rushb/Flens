import unixToDateTime from '../../../utils/unixToDateTime.js';
import { successfullNoty } from '../../../utils/useNotify.js';
import ActionList from './ActionList';
import './Post.scss';
import PostComment from './PostComment.jsx';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Camera2,
  X,
  GlobeAsiaAustralia,
  PersonFill,
  LockFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const Post = ({
  item,
  userId,
  showImageDetail,
  toggleImageDetail,
  showReport,
  toggleShowReport,
  setImageToReport,
  setItemShowDetail,
}) => {
  // console.log({ item });
  const navigate = useNavigate();
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [showTechnicalInfor, setShowTechnicalInfor] = useState(false);
  const [postVisibility, setPostVisibility] = useState(item.postViewStatus);

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${userId}`);
  }, [navigate, userId]);

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

  const renderPostModeIcon = useCallback(() => {
    if (postVisibility === 'PUBLIC')
      return <GlobeAsiaAustralia size={15} color="#f08080" />;
    else if (postVisibility === 'PRIVATE')
      return <LockFill size={16} color="#f08080" />;
    else return <PersonFill size={18} color="#f08080" />;
  }, [postVisibility]);

  useEffect(() => {
    if (isDeletedPost) {
      successfullNoty('delete post sucessfull!');
    }
  }, [isDeletedPost]);

  return useMemo(
    () => (
      <>
        {isDeletedPost ? (
          <></>
        ) : (
          <div className="posts-wrapper">
            <div className="post-header">
              <div className="left-header-wrapper">
                <img
                  src={item.userId.profileImageURL}
                  onClick={handleViewProfile}
                  id="avatar"
                  alt=""
                />
                <div>
                  <span id="username">{item.userId.name}</span>
                  uploaded a photo
                  <div id="date">
                    {unixToDateTime(item.createdAt)}
                    {renderPostModeIcon()}
                  </div>
                </div>
              </div>
              <ActionList
                item={item}
                showReport={showReport}
                setImageToReport={setImageToReport}
                toggleShowReport={toggleShowReport}
                setIsDeletedPost={setIsDeletedPost}
                setPostVisibility={setPostVisibility}
                postVisibility={postVisibility}
              />
            </div>

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
                {item && <PostComment item={item} />}
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      handleClickTag,
      handleViewDetail,
      handleViewProfile,
      isDeletedPost,
      item,
      postVisibility,
      renderPostModeIcon,
      setImageToReport,
      showImageDetail,
      showReport,
      showTechnicalInfor,
      toggleShowReport,
    ]
  );
};

export default Post;
