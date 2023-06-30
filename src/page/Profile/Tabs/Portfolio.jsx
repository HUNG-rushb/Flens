import AlbumImage from './Portfolio/AlbumImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';

const Portfoio = ({ userId }) => {
  return (
    <div className="portfolio-tab">
      <AlbumImage userId={userId} />

      <LatestUploadImage userId={userId} />

      <FavouriteImage userId={userId} />
    </div>
  );
};

export default Portfoio;
