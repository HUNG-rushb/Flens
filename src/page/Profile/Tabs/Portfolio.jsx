import AlbumImage from './Portfolio/AlbumImage';
import FavouriteImage from './Portfolio/FavouriteImage';
import LatestUploadImage from './Portfolio/LatestUploadImage';

const Portfoio = ({ userProfileData, userAllPostData }) => {
  return (
    <div className="portfolio-tab">
      <AlbumImage userProfileData={userProfileData}/>
      <LatestUploadImage userAllPostData={userAllPostData} />
      <FavouriteImage userAllPostData={userAllPostData} />
    </div>
  );
};

export default Portfoio;
