import AvatarStory from './../../assets/images/avatar.jpg';
import './StoryPage.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const StoryPage = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  const stories = [
    {
      id: 1,
      avatar: AvatarStory,
      name: 'Nguyen Van A',
      time: '1 day ago',
      storyTitle: 'This is the tittle of the story',
      storyContent: 'the content of this story here ...',
      storyImage:
        'https://images.pexels.com/photos/10899530/pexels-photo-10899530.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 2,
      avatar: AvatarStory,
      name: 'Nguyen Van A',
      time: '1 day ago',
      storyTitle: 'This is the tittle of the story',
      storyContent: 'the content of this story here ...',
      storyImage:
        'https://images.pexels.com/photos/10899530/pexels-photo-10899530.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
  ];

  const navigate = useNavigate()
  const handeClickStoryDetail = (story) => {
    navigate(`/stories/${story.storyTitle.split(' ').join('')}`)
  }

  return (
    <div className="stories-page">
      <div className="stories">
        {stories.map((story) => (
          <div className="story" key={story.id}>
            <div className="header-story">
              <img src={story.avatar} alt="" />
              <div className="fullname-and-time-story">
                <span id='story-fullname'>{story.name}</span> <span>{story.time}</span>
              </div>
            </div>
            <div className="description-story">
              <span id='story-title' onClick={()=>handeClickStoryDetail(story)}>{story.storyTitle}</span>
              <br />
              {story.storyContent}
            </div>
            <div className="image-story">
              <img src={story.storyImage} alt="" onClick={()=>handeClickStoryDetail(story)}/>
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
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
