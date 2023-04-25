import TextAreacustom from '../../components/TextArea/Textarea';
import { useState } from 'react';
import { CameraFill, PencilSquare } from 'react-bootstrap-icons';

const UploadBar = () => {
  const [yourStatus, setYourStatus] = useState('');
  const handleSubmitStatus = () => {
    console.log('submit status', yourStatus);
  };
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
        <div className="upload-images">
          <CameraFill size={28} color="#F08080" />
          Upload a photo
        </div>
        <div className="upload-storys">
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
