import Album1 from '../../../../assets/images/album1.png';
import Album2 from '../../../../assets/images/album2.png';
import Album3 from '../../../../assets/images/album3.png';

const AlbumImage = () => {
  return (
    <div className="album">
      <span>Album (3)</span>
      <div className="album-images">
        <div className="left-album">
          <img src={Album1} alt="album1" width={'100%'} />
        </div>
        <div className="right-album">
          <img src={Album2} alt="album2" style={{ width: '75%' }} />
          <img src={Album3} alt="album3" style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
};

export default AlbumImage;
