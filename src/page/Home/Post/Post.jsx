import unixToDateTime from '../../../utils/unixToDateTime.js';
import './Post.scss';
import PostComment from './PostComment.jsx';
import PostInteraction from './PostInteraction.jsx';
import PostTechnical from './PostTechnical.jsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

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
  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${userId}`);
  }, [navigate, userId]);

  const handleViewDetail = useCallback(() => {
    setItemShowDetail(item);
    toggleImageDetail();
  }, [item, setItemShowDetail, toggleImageDetail]);

  const [showTechnicalInfor, setTechnicalInfor] = useState(false);

  useEffect(() => {
    if (isDeletedPost) {
      toast.info('delete post sucessfull!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
              <img
                src={item.userId.profileImageURL}
                onClick={handleViewProfile}
                id="avatar"
                alt=""
              />
              <div>
                <span id="username">{item.userId.name}</span>
                uploaded a photo
                <div id="date">{unixToDateTime(item.createdAt)}</div>
              </div>
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
                  {showTechnicalInfor && (
                    <div className="technical-container">
                      <PostTechnical
                        item={item}
                        showImageDetail={showImageDetail}
                      />
                    </div>
                  )}
                  <div className="technical-infor-icon">
                    {!showTechnicalInfor ? (
                      <EyeFill
                        size={28}
                        color="#f08080"
                        onClick={() => setTechnicalInfor(true)}
                      />
                    ) : (
                      <EyeSlashFill
                        size={28}
                        color="#f08080"
                        onClick={() => setTechnicalInfor(false)}
                      />
                    )}
                  </div>
                </div>
                <div className="post-title">{item.title}</div>
                <div className="hash-tags">
                  {item.tag.map((tag, index) => (
                    <span id="tag" key={index}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <PostInteraction
                  item={item}
                  showReport={showReport}
                  setImageToReport={setImageToReport}
                  toggleShowReport={toggleShowReport}
                  setIsDeletedPost={setIsDeletedPost}
                />

                <PostComment item={item} />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      handleViewDetail,
      handleViewProfile,
      isDeletedPost,
      item,
      setImageToReport,
      showImageDetail,
      showReport,
      showTechnicalInfor,
      toggleShowReport,
    ]
  );
};

export default Post;
