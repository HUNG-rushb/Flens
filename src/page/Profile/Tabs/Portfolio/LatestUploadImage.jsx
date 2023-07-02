import React from 'react';

const LatestUploadImage = ({ userAllPostData }) => {
  return (
    <div className="latest-upload">
      <div className="portfolio-title">
        <span>
          Latest upload
          {userAllPostData
            ? ` (${userAllPostData?.userInfo.posts.length})`
            : ''}
        </span>
        <span id="see-all-button">See all</span>
      </div>
      <div className="latest-upload-images">
        {userAllPostData?.userInfo.posts.slice(0, 3).map((item) => (
          <img key={item.id} src={item.image.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default LatestUploadImage;
