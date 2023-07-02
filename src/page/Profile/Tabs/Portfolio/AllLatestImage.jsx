import React from 'react';

const AllLatestImage = ({ userAllPostData, setComponentToRender }) => {
  console.log(userAllPostData);
  return (
    <div className="all-latest-image-container">
      <div>
        <button id="back-to-portfolio" onClick={() => setComponentToRender(0)}>
          Back
        </button>
      </div>
      <div className="all-latest-image-header">
        <span id="all-latest-image-title">Latest upload image</span>
      </div>
      <div className="all-latest-images">
        {userAllPostData.userInfo.posts.map((post) => (
          <div className="all-latest-image" key={post.id}>
            <img src={post.image.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLatestImage;
