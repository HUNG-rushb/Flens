import AlbumDetail from './Portfolio/AlbumDetail';
import AlbumImage from './Portfolio/AlbumImage';
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
          </div>
        )}
        {componentToRender === 1 && (
          <AlbumDetail
            detailAlbum={detailAlbum}
            setComponentToRender={setComponentToRender}
          />
        )}
      </>
    ),
    [componentToRender, detailAlbum]
  );
};

export default Portfoio;
