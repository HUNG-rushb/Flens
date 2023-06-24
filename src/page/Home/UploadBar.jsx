import { CameraFill, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const UploadBar = () => {
  const navigate = useNavigate();

  const handleClickUploadPart = () => {
    navigate('/upload')
  }

  const handleClickUploadStory = () => {
    navigate('/uploadStory')
  }

  return (
    <div className="upload-bar">
      <div className="upload-content">
        <div className="upload-images" onClick={handleClickUploadPart} >
          <CameraFill size={28} color="#F08080" />
          Upload a photo
        </div>
        <div className="upload-storys" onClick={handleClickUploadStory}>
          <PencilSquare size={28} color="#F08080" />
          Publish a Story
        </div>
      </div>
    </div>
  );
};

export default UploadBar;
