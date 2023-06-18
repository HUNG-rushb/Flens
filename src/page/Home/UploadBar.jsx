import TextAreacustom from '../../components/TextArea/Textarea';
import { useState } from 'react';
import { CameraFill, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const UploadBar = () => {
  const navigate = useNavigate();

  const [yourStatus, setYourStatus] = useState('');
  const handleSubmitStatus = () => {
    console.log('submit status', yourStatus);
  };

  const handleClickUploadPart = () => {
    navigate('/upload')
  }

  const handleClickUploadStory = () => {
    navigate('/uploadStory')
  }

  return (
    <div className="upload-bar">
      <TextAreacustom
        type={'uploadBar'}
        placeholder="Write something about your day!"
        value={yourStatus}
        onChange={(e) => setYourStatus(e.target.value)}
      />
      <hr style={{ border: '1px solid #F08080' }} />
      <div className="upload-content">
        <div className="upload-images" onClick={handleClickUploadPart} >
          <CameraFill size={28} color="#F08080" />
          Upload a photo
        </div>
        <div className="upload-storys" onClick={handleClickUploadStory}>
          <PencilSquare size={28} color="#F08080" />
          Publish a Story
        </div>
        <button id="post-btn" onClick={handleSubmitStatus}>
          Post
        </button>
      </div>
    </div>
  );
};

export default UploadBar;
