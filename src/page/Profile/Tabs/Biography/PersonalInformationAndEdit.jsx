import ButtonCustom from '../../../../components/Button/ButtonCustom';
import { useEffect, useState } from 'react';
import { CameraFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const PersonalInforAndEdit = ({ userAllPostData }) => {
  // console.log(userAllPostData);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editProfile');
  };

  const [userLevel, setUserLevel] = useState(0);

  useEffect(() => {
    let level = 0;
    userAllPostData?.userInfo.posts.map((item) => (level += item.points));
    setUserLevel(level);
  }, [userAllPostData]);

  return (
    <div className="bio-right">
      <div className="social-infor">
        <div>
          2<span>Following</span>
        </div>
        <div>
          2<span>Followers</span>
        </div>
        <div>
          {userLevel}
          <span>Level</span>
        </div>
      </div>
      <div className="personal-infor">
        <div>
          <span>Email:</span> a@gmail.com
        </div>
        <div>
          <span>Phone number:</span> 0123456789
        </div>
        <div>
          <span>Birthday:</span> 01/01/2001
        </div>
      </div>

      <div className="camera">
        <CameraFill />
        <span id="camera-text">
          Cannon Eos 80D, Cannon Eos 700D, Nikon P1000, Polaroid 100L
          underwater.
        </span>
      </div>
      <div className="edit-btn">
        <ButtonCustom text={'Edit'} type="default2" onClick={handleEditClick} />
      </div>
    </div>
  );
};

export default PersonalInforAndEdit;
