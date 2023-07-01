import Favourites1 from '../../../../assets/images/Profile/favourites1.png';
import Favourites2 from '../../../../assets/images/Profile/favourites2.png';

const FavouriteImage = () => {
  return (
    <div className="favourites">
      <span id='portfolio-title'>Favourites album</span>
      <div className="favoutites-images">
        <img src={Favourites1} alt="Favourites1" width={'30%'} />
        <img src={Favourites2} alt="Favourites2" width={'30%'} />
      </div>
    </div>
  );
};

export default FavouriteImage;
