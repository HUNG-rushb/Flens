import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';
import { useState } from 'react';

const Portfoio = ({ userProfileData, userAllPostData }) => {
  const [albumDetailClick, setAlbumDetailClick] = useState(false);

  return (
    <>
      {!albumDetailClick && <div className="portfolio-tab">
        <AlbumImage userProfileData={userProfileData} setAlbumDetail={setAlbumDetailClick} />
        <LatestUploadImage userAllPostData={userAllPostData} />
        <FavouriteImage userAllPostData={userAllPostData} />
      </div>}
      {albumDetailClick && <AlbumDetail userAllPostData={userAllPostData} setAlbumDetailClick={setAlbumDetailClick} />}
    </>
  );
};

export default Portfoio;
