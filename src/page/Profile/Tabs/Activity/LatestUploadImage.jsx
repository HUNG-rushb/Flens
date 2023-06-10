import LatestUpload from '../../../../assets/images/Profile/latest-upload.png';

const LatestUploadImage = () => {
  return (
    <div className="latest-upload">
      <span>Latest upload</span>
      <div className="latest-upload-images">
        <img src={LatestUpload} alt="latest-upload" width={'45%'} />
      </div>
    </div>
  );
};

export default LatestUploadImage;
