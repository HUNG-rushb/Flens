import React from "react";

const AlbumImage = ({ userProfileData }) => {
  const fakeAlbum = [
    {
      id: 1,
      image: userProfileData?.userInfo.profileImageURL,
      title: 'Avatar',
    },
    {
      id: 2,
      image: userProfileData?.userInfo.backgroundImageURL,
      title: 'Cover image',
    },
  ];

  return (
    <div className="album">
      <div className="album-title">
        <span>Album </span>
        <span id="see-all-button">See all</span>
      </div>
      <div className="album-images">
        <div>
          <div className="new-album">+</div>
          <span id="child-album-title">Create album</span>
        </div>
        {fakeAlbum.map((album) => (
          <div key={album.id} className="child-album">
            <img src={album.image} alt="" />
            <span id="child-album-title">{album.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumImage;
