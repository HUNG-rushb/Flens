import { Tab, Tabs } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import CoverImage from '../../assets/images/profileCoverImage.jpg';
import Album1 from '../../assets/images/album1.png';
import Album2 from '../../assets/images/album2.png';
import Album3 from '../../assets/images/album3.png';
import LatestUpload from '../../assets/images/latest-upload.png';
import Favourites1 from '../../assets/images/favourites1.png';
import Favourites2 from '../../assets/images/favourites2.png';
import Button from '../../components/Button/Button';
import { CameraFill } from 'react-bootstrap-icons';
import Modal from '../../components/Modal/Modal';

import './Profile.css';
import { useState } from 'react';

const Profile = () => {
  const handleClick = () => {
    console.log('add experience click');
  };

  const handleAddSkills = (e) => {
    setKills(e)
  }

  const skills = [
    {
      value: 'Visual',
    },
    {
      value: 'Color',
    },
    {
      value: 'Animal',
    },
    {
      value: 'Human',
    },
    {
      value: 'Food',
    },
  ];

  const [skill, setKills] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const SkillsList = ({ item }) => {
    return <div>{item.value}</div>;
  };

  const Activity = () => {
    return (
      <div className="activity-tab">
        <div className="album">
          <span>Album (3)</span>
          <div className="album-images">
            <div className="left-album">
              <img src={Album1} alt="album1" style={{ width: '100%' }} />
            </div>
            <div className="right-album">
              <img src={Album2} alt="album2" style={{ width: '75%' }} />
              <img src={Album3} alt="album3" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
        <div className="latest-upload">
          <span>Latest upload</span>
          <div className="latest-upload-images">
            <img src={LatestUpload} alt="latest-upload" />
          </div>
        </div>
        <div className="favourites">
          <span>Favourites album</span>
          <div className="favoutites-images">
            <img src={Favourites1} alt="Favourites1" />
            <img src={Favourites2} alt="Favourites2" />
          </div>
        </div>
      </div>
    );
  };

  const Biography = () => {
    return (
      <div className="biography-tab">
        <div className="bio-left">
          <div className="bio-experience">
            <div className="experience-text">
              <span>Experience:</span>
              <text>No experiences to show, consider adding some.</text>
            </div>
            <div className="exp-btn">
              <Button
                text={'Add Experience'}
                type="default2"
                onClick={(e) => handleClick(e)}
              ></Button>
            </div>
          </div>
          <div className="bio-skills">
            <div className="skills-text">
              <span>Skills:</span>
              <div className="badge-container">
                {skills.map((item) => {
                  return <SkillsList item={item} />;
                })}
              </div>
            </div>

            <div className="skill-btn">
            
              <Button
                text={'Add Skills'}
                type="default2"
                onClick={setShow(true)}
              ></Button>
              {/* <Modal show={show} handleClose={handleClose} /> */}
            </div>
          </div>
        </div>
        <div className="bio-right">
          <div className="social-infor">
            <div>
              2<span>Following</span>
            </div>
            <div>
              2<span>Followers</span>
            </div>
            <div>
              0<span>Level</span>
            </div>
          </div>
          <div className="personal-infor">
            <div >
              <span>Email:</span> a@gmail.com
            </div>
            <div >
              <span>Phone number:</span> 0123456789
            </div>
            <div >
              <span>Birthday:</span> 01/01/2001
            </div>
          </div>

          <div className="camera">
            <CameraFill />
            <span>
              Cannon Eos 80D, Cannon Eos 700D, Nikon P1000, Polaroid 100L
              underwater.
            </span>
          </div>
          <div className="edit-btn">
            <Button
              text={'Edit'}
              type="default2"
              onClick={(e) => handleClick(e)}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="profilePage">
      <div className="overlay"></div>
      <img src={CoverImage} alt="" className="coverImage"></img>
      <div className="peronalInfor">
        <div className="coverImageContent">
          <PersonCircle size="sm" className="profileAvatar" />
          <div className="profileName">Nguyen Van A</div>
        </div>
      </div>

      <div className="profile-tabs">
        <Tabs defaultActiveKey="Biography">
          <Tab eventKey="Activity" title="Activity">
            <Activity />
          </Tab>
          <Tab eventKey="Biography" title="Biography">
            <Biography />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
