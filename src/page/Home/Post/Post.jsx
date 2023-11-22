import Button from '../../../components/Button/Button.jsx';
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
  index,
  userId,
  showImageDetail,
  toggleImageDetail,
  showReport,
  toggleShowReport,
  setImageToReport,
  setItemShowDetail,
}) => {
  console.log({ item });
  const navigate = useNavigate();
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [showTechnicalInfor, setShowTechnicalInfor] = useState(false);
  const [postVisibility, setPostVisibility] = useState(item.postViewStatus);
  const userLevel = useMemo(() => item?.userLevel || 'New', [item?.userLevel]);
  const [isHovered, setIsHovered] = useState(false);

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

  const renderPopoverContent = useCallback(() => {
    return (
      <div className={index === 0 ? 'hover-avatar-first-item' : 'hover-avatar'}>
        <div className="hover-content">
          <img
            src={item.userId.profileImageURL}
            id="avatar-hover"
            width={100}
            height={100}
            onClick={handleViewProfile}
            alt=""
          />
          <div className="left-hover-content">
            <p id="username" onClick={handleViewProfile}>
              {item.userId.name}
            </p>
            <p>User level: 1</p>
            <p style={{ fontWeight: 600 }}>100 Follower - Hung also followed</p>
            <Button type="default2" text="Chat" />
          </div>
        </div>
      </div>
    );
  }, [handleViewProfile, index, item.userId.name, item.userId.profileImageURL]);

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
                <div
                  className="avatar-wrapper"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img src={item.userId.profileImageURL} id="avatar" alt="" />
                  {isHovered && renderPopoverContent()}

                  <div className="user-level">{userLevel}</div>
                </div>
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
                {item && <PostComment item={item} userLevel={userLevel} />}
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
      isHovered,
      item,
      postVisibility,
      renderPopoverContent,
      renderPostModeIcon,
      setImageToReport,
      showImageDetail,
      showReport,
      showTechnicalInfor,
      toggleShowReport,
      userLevel,
    ]
  );
};

export default Post;
