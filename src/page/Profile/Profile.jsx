import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Avatar from '../../assets/images/avatar.jpg';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import './Profile.css';
import TabMenu from './Tabs/Tabs';
import { Suspense } from 'react';

const Profile = () => {
  const { id: userId } = useAuthState();

  const { isFetching, fetchedData, fetchError } = useUserProfileImage({
    userInfoData: { userId },
  });
  console.log({ fetchedData });

  return (
    <Page title={'Flens-Profile'}>
      <Suspense fallback={null}>
        <div className="profilePage">
          <div className="overlay"></div>
          <img
            src={fetchedData?.userInfo.backgroundImageURL}
            alt=""
            className="coverImage"
          />
          <div className="peronalInfor">
            <div className="coverImageContent">
              <img src={fetchedData?.userInfo.profileImageURL} alt="" />
              <div className="profileName">{fetchedData?.userInfo.name}</div>
            </div>
          </div>
          <TabMenu />
        </div>
      </Suspense>
    </Page>
  );
};

export default Profile;
