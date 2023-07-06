import { useGetAllStories } from '../../graphql/useStory';
import unixToDateTime from '../../utils/unixToDateTime';
import './StoryPage.css';
import React, { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const StoryPage = () => {
  const { isFetching, fetchedData, fetchError } = useGetAllStories();
  // console.log(12313, { fetchedData });

  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  const navigate = useNavigate();
  const handeClickStoryDetail = (storyId) => {
    navigate(`/stories/${storyId}`);
  };

  return (
    <div className="stories-page">
      <div className="stories">
        {fetchedData?.allStories.map((item, idx) => (
          <div className="story" key={idx}>
            <div className="header-story">
              <img src={item.userId.profileImageURL} />
              <div className="fullname-and-time-story">
                <span id="story-fullname">{item.userId.namee}</span>
                <span>{unixToDateTime(item.createdAt)}</span>
              </div>
            </div>

            <div className="description-story">
              <span
                id="story-title"
                onClick={() => handeClickStoryDetail(item.id)}
              >
                {item.title}
              </span>
            </div>

            <div className="image-story">
              <img
                src={item.images[0]}
                onClick={() => handeClickStoryDetail(item.id)}
              />
            </div>

            <div className="story-interaction">
              {!isLiked ? (
                <Heart size={28} onClick={handleClickLike} />
              ) : (
                <HeartFill size={28} color="red" onClick={handleClickLike} />
              )}

              <span>{item.points}</span>

              <ThreeDots size={28} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
