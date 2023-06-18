import AvatarStory from './../../assets/images/avatar.jpg';
import './StoryPage.css';
import React, { useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const StoryPage = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="stories-page">
      <div className="stories">
        <div className="story">
          <div className="header-story">
            <img src={AvatarStory} alt="" />
            <span>Nguyen Van A - 1 day ago</span>
          </div>
          <div className="description-story">
            <span>This is the tittle of the story</span><br />
            the content of this story here ...
          </div>
          <div className="image-story">
            <img
              src="https://images.pexels.com/photos/8910681/pexels-photo-8910681.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
          <div className="story-interaction">
            {!isLiked ? (
              <Heart size={28} onClick={handleClickLike} />
            ) : (
              <HeartFill size={28} color="red" onClick={handleClickLike} />
            )}
            <span>10</span>
            <Reply size={28} /> <span>10</span>
            <ThreeDots size={28} />
          </div>
        </div>
        <div className="story">
          <div className="header-story">
            <img src={AvatarStory} alt="" />
            <span>Nguyen Van A - 1 day ago</span>
          </div>
          <div className="description-story">
            <span>This is the tittle of the story</span><br />
            the content of this story here ...
          </div>
          <div className="image-story">
            <img
              src="https://images.pexels.com/photos/10899530/pexels-photo-10899530.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
            />
          </div>
          <div className="story-interaction">
            {!isLiked ? (
              <Heart size={28} onClick={handleClickLike} />
            ) : (
              <HeartFill size={28} color="red" onClick={handleClickLike} />
            )}
            <span>10</span>
            <Reply size={28} /> <span>10</span>
            <ThreeDots size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
