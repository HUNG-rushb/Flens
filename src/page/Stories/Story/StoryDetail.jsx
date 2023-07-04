import './StoryDetail.css';
import React, { useEffect, useRef, useState } from 'react';
import { Heart, HeartFill, Reply, ThreeDots, Flag, Trash } from 'react-bootstrap-icons';

const storyData = {
  id: 1,
  userAvatar:
    'https://images.pexels.com/photos/3658120/pexels-photo-3658120.jpeg?auto=compress&cs=tinysrgb&w=600',
  userName: 'Nguyen',
  time: '1 day ago',
};

const StoryDetail = () => {
  const clickOutsideRef = useRef(null);

  const [isLiked, setIsLiked] = useState(false);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };
  
  const handleClickReportStory = () => {
    setShowListOtherActions(true)
  }

  const handleClickDeleteStory = () => {
setShowListOtherActions(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListOtherActions(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const storyContent = `<h1>something in title</h1><p><br></p><p>content here</p><p><br></p><p><br></p><p><img src="https://bku-image-story.s3.ap-southeast-1.amazonaws.com/313115171_539574057499719_4456594889956300652_n-390763.jpg"></p><p><img src="https://bku-image-story.s3.ap-southeast-1.amazonaws.com/313855905_869280087580635_170760695398301708_n-148241.jpg"></p>`;
  return (
    <div className="story-detail-container">
      <div className="story-detail-content">
        <div className="story-detail-userInfor">
          <img src={storyData.userAvatar} alt="" />
          <div>
            <span id="story-detail-username">{storyData.userName}</span>
            <span>{storyData.time}</span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: storyContent }} />
        <div className="story-detail-interaction" ref={clickOutsideRef}>
          <div>
            {!isLiked ? (
              <Heart size={28} onClick={handleClickLike} />
            ) : (
              <HeartFill size={28} color="red" onClick={handleClickLike} />
            )}
            <span>10</span>
            <Reply size={28} /> <span>10</span>
          </div>
          <ThreeDots size={28} onClick={() => setShowListOtherActions((prev) => !prev)} />
          <div className="list-other-actions" hidden={showListOtherActions}>
            <ul>
              <li onClick={handleClickReportStory}>
                <Flag color="blue" />
                Report this story
              </li>
              <li onClick={handleClickDeleteStory}>
                <Trash color="red" />
                Delete story
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
