import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import './Profile.css';
import TabMenu from './Tabs/Tabs';
import { Suspense } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

const Profile = () => {
  return (
    <Page title={'Flens-Profile'}>
      <Suspense fallback={null}>
        <div className="profilePage">
          <div className="overlay"></div>
          <img src={CoverImage} alt="" className="coverImage" />
          <div className="peronalInfor">
            <div className="coverImageContent">
              <PersonCircle size={200} />
              <div className="profileName">Nguyen Van A</div>
            </div>
          </div>
          <TabMenu />
        </div>
      </Suspense>
    </Page>
  );
};

export default Profile;
