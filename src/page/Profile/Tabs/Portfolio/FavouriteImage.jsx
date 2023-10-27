import React from 'react';

const FavouriteImage = ({ posts, setComponentToRender }) => {
  return (
    <div className="favourites">
      <div className="favourites-title">
        <span>Favourites image </span>
        <span id="see-all-button" onClick={() => setComponentToRender(3)}>
          See all
        </span>
      </div>

      <div className="favoutites-images">
        {posts?.slice(0, 2).map((item, idx) => (
          <img
            key={'key' + item?.id + idx}
            src={item?.node?.image.url}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default FavouriteImage;
