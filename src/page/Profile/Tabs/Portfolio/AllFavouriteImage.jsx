import React from 'react';

const AllFavouriteImage = ({ userAllPostData, setComponentToRender }) => {
  return (
    <div className="all-favourite-image-container">
      <div>
        <button id="back-to-portfolio" onClick={() => setComponentToRender(0)}>
          Back
        </button>
      </div>
      <div className="all-favourite-image-header">
        <span id="all-favourite-image-title">Favourite images</span>
      </div>
      <div className="all-favourite-images">
        {userAllPostData.userInfo.posts.slice(0,3).map((post) => (
          <div className="all-favourite-image" key={post.id}>
            <img src={post.image.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFavouriteImage;
