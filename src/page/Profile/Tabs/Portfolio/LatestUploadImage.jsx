import React from 'react';

const LatestUploadImage = ({ userAllPostData, setComponentToRender }) => {
  const handleClickSeeAll = () => {
    setComponentToRender(2)
  }
  return (
    <div className="latest-upload">
      <div className="portfolio-title">
        <span>
          Latest upload
          {userAllPostData
            ? ` (${userAllPostData?.userInfo.posts.length})`
            : ''}
        </span>
        <span id="see-all-button" onClick={handleClickSeeAll}>See all</span>
      </div>
      <div className="latest-upload-images">
        {userAllPostData?.userInfo.posts.slice(0,3).map((item) => (
          <img key={item.id} src={item.image.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default LatestUploadImage;
