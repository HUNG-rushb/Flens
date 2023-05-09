import AlbumImage from './Activity/AlbumImage'
import LatestUploadImage from './Activity/LatestUploadImage'
import FavouriteImage from './Activity/FavouriteImage';

const Activity = () => {
    return (
      <div className="activity-tab">
        <AlbumImage/>
        <LatestUploadImage/>
        <FavouriteImage/>
      </div>
    );
  };

  export default Activity;