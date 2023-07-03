import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';
import { useState } from 'react';
import AllLatestImage from './Portfolio/AllLatestImage';
import AllFavouriteImage from './Portfolio/AllFavouriteImage';

const Portfoio = ({ userProfileData, userAllPostData }) => {
  const [componentToRender, setComponentToRender] = useState(0);

  return (
    <>
      {componentToRender===0 && <div className="portfolio-tab">
        <AlbumImage userProfileData={userProfileData} setComponentToRender={setComponentToRender} />
        <LatestUploadImage userAllPostData={userAllPostData} setComponentToRender={setComponentToRender}  />
        <FavouriteImage userAllPostData={userAllPostData} setComponentToRender={setComponentToRender} />
      </div>}
      {componentToRender===1 && <AlbumDetail userAllPostData={userAllPostData} setComponentToRender={setComponentToRender} />}
      {componentToRender===2 && <AllLatestImage userAllPostData={userAllPostData} setComponentToRender={setComponentToRender} />}
      {componentToRender===3 && <AllFavouriteImage userAllPostData={userAllPostData} setComponentToRender={setComponentToRender} />}
    </>
  );
};

export default Portfoio;
