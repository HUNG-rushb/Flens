import React from 'react';

const FavouriteImage = ({ userAllPostData }) => {
  return (
    <div className="favourites">
      <div className="favourites-title">
        <span>Favourites image </span>
        <span id="see-all-button">See all</span>
      </div>
      <div className="favoutites-images">
        {userAllPostData?.userInfo.posts.slice(0, 2).map((item) => (
          <img key={item.id} src={item.image.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default FavouriteImage;
