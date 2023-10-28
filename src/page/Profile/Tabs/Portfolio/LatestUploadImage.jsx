import React from 'react';

const LatestUploadImage = ({ posts, setComponentToRender }) => {
  const handleClickSeeAll = () => {
    setComponentToRender(2);
  };
  return (
    <div className="latest-upload">
      <div className="portfolio-title">
        <span>
          Latest upload
          {posts ? ` (${posts?.length})` : ''}
        </span>

        <span id="see-all-button" onClick={handleClickSeeAll}>
          See all
        </span>
      </div>

      <div className="latest-upload-images">
        {posts?.slice(0, 3).map((item, idx) => (
          <img key={'key' + item?.id + idx} src={item?.node.image.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default LatestUploadImage;
