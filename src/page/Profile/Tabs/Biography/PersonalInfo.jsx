import Button from '../../../../components/Button/Button';
import './styles.scss';
import { CameraFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editProfile');
  };

  return (
    <div className="bio-right-container">
      {/* <div className="personal-infor">
        <div>
          <span>Email:</span> a@gmail.com
        </div>
        <div>
          <span>Phone number:</span> 0123456789
        </div>
        <div>
          <span>Birthday:</span> 01/01/2001
        </div>
      </div> */}

      <div className="camera-wrapper">
        <CameraFill id="camera-icon" />
        <span id="camera-text">
          Cannon Eos 80D, Cannon Eos 700D, Nikon P1000, Polaroid 100L
          underwater.
        </span>
      </div>
      <div className="edit-button">
        <Button text="Edit" type="default2" onClick={handleEditClick} />
      </div>
    </div>
  );
};

export default PersonalInfo;
