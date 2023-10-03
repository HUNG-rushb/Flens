import { useGetAllStories } from '../../graphql/useStory';
import unixToDateTime from '../../utils/unixToDateTime';
import './StoryPage.scss';
import React, { useCallback, useMemo, useState } from 'react';
import { Heart, HeartFill, ThreeDots } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const StoryPage = () => {
  const { isFetching, fetchedData, fetchError } = useGetAllStories();
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleViewDetail = useCallback(
    (storyId) => {
      navigate(`/stories/${storyId}`);
    },
    [navigate]
  );

  const renderHeartIcon = useCallback(() => {
    return !isLiked ? (
      <Heart size={28} onClick={handleClickLike} />
    ) : (
      <HeartFill size={28} color="red" onClick={handleClickLike} />
    );
  }, [isLiked]);

  return useMemo(
    () => (
      <div className="stories">
        {fetchedData?.allStories.map((item, idx) => (
          <div className="story" key={idx}>
            <div className="header">
              <img
                id="header-avatar"
                alt=""
                src={item.userId.profileImageURL}
              />
              <div className="sub-header">
                <span id="fullname">{item.userId.name}</span>
                <span>{unixToDateTime(item.createdAt)}</span>
              </div>
            </div>
            <div className="description">
              <span id="title" onClick={() => handleViewDetail(item.id)}>
                {item.title}
              </span>
              <img
                id="image"
                alt=""
                src={item.images[0]}
                onClick={() => handleViewDetail(item.id)}
              />
              <div className="interaction">
                {renderHeartIcon()}
                <span id="points">{item.points}</span>
                <ThreeDots size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    [fetchedData?.allStories, handleViewDetail, renderHeartIcon]
  );
};

export default StoryPage;
