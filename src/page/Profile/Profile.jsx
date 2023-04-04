import Album1 from '../../assets/images/album1.png';
import Album2 from '../../assets/images/album2.png';
import Album3 from '../../assets/images/album3.png';
import Favourites1 from '../../assets/images/favourites1.png';
import Favourites2 from '../../assets/images/favourites2.png';
import LatestUpload from '../../assets/images/latest-upload.png';
import CoverImage from '../../assets/images/profileCoverImage.jpg';
import ButtonCustom from '../../components/Button/ButtonCustom';
import InputCustom from '../../components/Input/Input';
import ModalCustom from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import './Profile.css';
import { Suspense, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { CameraFill } from 'react-bootstrap-icons';

const Profile = () => {
  const handleClick = () => {
    console.log('add experience click');
  };

  const skills = [
    {
      id: 1,
      value: 'Visual',
    },
    {
      id: 2,
      value: 'Color',
    },
    {
      id: 3,
      value: 'Animal',
    },
    {
      id: 4,
      value: 'Human',
    },
    {
      id: 5,
      value: 'Food',
    },
  ];

  const SkillsList = ({ item }) => {
    return <div >{item.value}</div>;
  };

  const Activity = () => {
    return (
      <div className="activity-tab">
        <div className="album">
          <span>Album (3)</span>
          <div className="album-images">
            <div className="left-album">
              <img
                src={Album1}
                alt="album1"
                style={{ width: '100%' }}
                width="sm"
                height="sm"
              />
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
    const [showSkill, setShowSkill] = useState(false);
    const handleShow = () => {
      setShowSkill(true);
    };

    const SubmitSkills = (e) => {
      e.preventdefault();
      console.log('submitclick', e.target);

    };
    const handleClose = () => {
      setShowSkill(false);
    };

    const modalContent = () => {
      return (
        <>
          <InputCustom type={'text'} value={initialSkill.skill} onChange={(e) => setInitialSkill(e.target.value)} />
        </>
      );
    };

    const [initialSkill, setInitialSkill] = useState({
      id: 0,
      skill: '',
    });
    return (
      <div className="biography-tab">
        <div className="bio-left">
          <div className="bio-experience">
            <div className="experience-text">
              <span>Experience:</span>
              No experiences to show, consider adding some.
            </div>
            <div className="exp-btn">
              <ButtonCustom
                text={'Add Experience'}
                type="default2"
                onClick={(e) => handleClick(e)}
              ></ButtonCustom>
            </div>
          </div>
          <div className="bio-skills">
            <div className="skills-text">
              <span>Skills:</span>
              <div className="badge-container">
                {skills.map((item) => {
                  return <SkillsList item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="skill-btn">
              <ButtonCustom
                text={'Add Skills'}
                type="default2"
                onClick={handleShow}
              />
              <form onSubmit={(e)=>SubmitSkills(e)}>
                <ModalCustom
                  show={showSkill}
                  handleclick={handleShow}
                  handleClose={handleClose}
                  modalTitle="Input your Skill"
                  modalContent={modalContent()}
                  onSubmit={(e) => SubmitSkills(e)}
                  size="md"
                />
              </form>
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
            <span>
              Cannon Eos 80D, Cannon Eos 700D, Nikon P1000, Polaroid 100L
              underwater.
            </span>
          </div>
          <div className="edit-btn">
            <ButtonCustom
              text={'Edit'}
              type="default2"
              onClick={(e) => handleClick(e)}
            ></ButtonCustom>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Page title={'Flens-Profile'}>
      <Suspense fallback={null}>
        <div className="profilePage">
          <div className="overlay"></div>
          <img
            src={CoverImage}
            alt=""
            className="coverImage"
            width="0"
            height="0"
          ></img>
          <div className="peronalInfor">
            <div className="coverImageContent">
              <PersonCircle
                size="sm"
                className="profileAvatar"
                width="40%"
                height="40%"
              />
              <div className="profileName">Nguyen Van A</div>
            </div>
          </div>

          <div className="profile-tabs">
            <Tabs defaultActiveKey="Activity">
              <Tab eventKey="Activity" title="Activity">
                <Activity />
              </Tab>
              <Tab eventKey="Biography" title="Biography">
                <Biography />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Profile;