import { useGetAllStories } from '../../graphql/useStory';
import './StoryPage.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Heart, HeartFill, Reply, ThreeDots } from 'react-bootstrap-icons';

const StoryPage = () => {
  const { isFetching, fetchedData, fetchError } = useGetAllStories();
  console.log(12313, { fetchedData });

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
