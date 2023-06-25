import AlbumImage from './Portfolio/AlbumImage'
import LatestUploadImage from './Portfolio/LatestUploadImage'
import FavouriteImage from './Portfolio/FavouriteImage';

const Portfoio = () => {
    return (
      <div className="portfolio-tab">
        <AlbumImage/>
        <LatestUploadImage/>
        <FavouriteImage/>
      </div>
    );
  };
 
  export default Portfoio;