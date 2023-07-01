import { useGetAllStories } from '../../graphql/useStory';
import './StoryPage.css';
import React, { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const StoryPage = () => {
  const { isFetching, fetchedData, fetchError } = useGetAllStories();
  console.log(12313, { fetchedData });

  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="stories-page">
      <div className="stories">
        {fetchedData?.allStories.map((item) => (
          <>
            <div className="story">
              <div className="header-story">
                <img src={item.userId.profileImageURL} />
                <span>{item.userId.name}</span>
              </div>

              <div className="description-story">
                <span>{item.title}</span>
              </div>

              <div className="image-story">
                <img src={item.images[0]} />
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
          </>
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
