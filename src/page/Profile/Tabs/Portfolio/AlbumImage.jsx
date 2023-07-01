import Album1 from '../../../../assets/images/Profile/album1.png';
import Album2 from '../../../../assets/images/Profile/album2.png';
import Album3 from '../../../../assets/images/Profile/album3.png';

const AlbumImage = () => {
  return (
    <div className="album">
      <span  id='portfolio-title'>Album (3)</span>
      <div className="album-images">
        <div className="left-album">
          <img src={Album1} alt="album1" />
        </div>
        <div className="right-album">
          <img src={Album2} alt="album2" />
          <img src={Album3} alt="album3" />
        </div>
      </div>
    </div>
  );
};

export default AlbumImage;
