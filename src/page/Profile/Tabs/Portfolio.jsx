import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
// import AllFavouriteImage from './Portfolio/AllFavouriteImage';
// import AllLatestImage from './Portfolio/AllLatestImage';
// import FavouriteImage from './Portfolio/FavouriteImage';
// import LatestUploadImage from './Portfolio/LatestUploadImage';
import { useMemo, useState } from 'react';

const Portfoio = () => {
  const [componentToRender, setComponentToRender] = useState(0);
  const [detailAlbum, setDetailAlbum] = useState({});

  return useMemo(
    () => (
      <>
        {componentToRender === 0 && (
          <div className="portfolio-tab">
            <AlbumImage
              setComponentToRender={setComponentToRender}
              setDetailAlbum={setDetailAlbum}
            />
            {/* <LatestUploadImage
              posts={posts}
              setComponentToRender={setComponentToRender}
            />
            <FavouriteImage
              posts={posts}
              setComponentToRender={setComponentToRender}
            /> */}
          </div>
        )}
        {componentToRender === 1 && (
          <AlbumDetail
            detailAlbum={detailAlbum}
            setComponentToRender={setComponentToRender}
          />
        )}
        {/* {componentToRender === 2 && (
          <AllLatestImage
            setComponentToRender={setComponentToRender}
          />
        )}
        {componentToRender === 3 && (
          <AllFavouriteImage
            setComponentToRender={setComponentToRender}
          />
        )} */}
      </>
    ),
    [componentToRender, detailAlbum]
  );
};

export default Portfoio;
