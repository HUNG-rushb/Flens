import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
import AllFavouriteImage from './Portfolio/AllFavouriteImage';
import AllLatestImage from './Portfolio/AllLatestImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';
import { useMemo, useState } from 'react';

const Portfoio = ({ userProfileData, posts }) => {
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
              posts={posts}
              setComponentToRender={setComponentToRender}
            />
            <FavouriteImage
              posts={posts}
              setComponentToRender={setComponentToRender}
            />
          </div>
        )}
        {componentToRender === 1 && (
          <AlbumDetail
            posts={posts}
            setComponentToRender={setComponentToRender}
          />
        )}
        {componentToRender === 2 && (
          <AllLatestImage
            posts={posts}
            setComponentToRender={setComponentToRender}
          />
        )}
        {componentToRender === 3 && (
          <AllFavouriteImage
            posts={posts}
            setComponentToRender={setComponentToRender}
          />
        )}
      </>
    ),
    [componentToRender, posts, userProfileData]
  );
};

export default Portfoio;
