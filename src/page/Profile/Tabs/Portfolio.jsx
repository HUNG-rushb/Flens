import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
import AllFavouriteImage from './Portfolio/AllFavouriteImage';
import AllLatestImage from './Portfolio/AllLatestImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';
import { useMemo, useState } from 'react';

const Portfoio = ({ userProfileData, userAllPostData }) => {
  const [componentToRender, setComponentToRender] = useState(0);

  return useMemo(
    () => (
      <>
        {componentToRender === 0 && (
          <div className="portfolio-tab">
            <AlbumImage
              userProfileData={userProfileData}
              setComponentToRender={setComponentToRender}
            />
            <LatestUploadImage
              userAllPostData={userAllPostData}
              setComponentToRender={setComponentToRender}
            />
            <FavouriteImage
              userAllPostData={userAllPostData}
              setComponentToRender={setComponentToRender}
            />
          </div>
        )}
        {componentToRender === 1 && (
          <AlbumDetail
            userAllPostData={userAllPostData}
            setComponentToRender={setComponentToRender}
          />
        )}
        {componentToRender === 2 && (
          <AllLatestImage
            userAllPostData={userAllPostData}
            setComponentToRender={setComponentToRender}
          />
        )}
        {componentToRender === 3 && (
          <AllFavouriteImage
            userAllPostData={userAllPostData}
            setComponentToRender={setComponentToRender}
          />
        )}
      </>
    ),
    [componentToRender, userAllPostData, userProfileData]
  );
};

export default Portfoio;
