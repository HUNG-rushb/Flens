import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import './Profile.css';
import TabMenu from './Tabs/Tabs';
import { Suspense } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

const Profile = () => {
  const { id: userId } = useAuthState();
  console.log("user id: ", userId)

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
            src={
              fetchedData?.userInfo.backgroundImageURL
                ? fetchedData?.userInfo.backgroundImageURL
                : CoverImage
            }
            alt=""
            className="coverImage"
          />
          <div className="peronalInfor">
            <div className="coverImageContent">
              {fetchedData?.userInfo.profileImageURL ? (
                <img src={fetchedData?.userInfo.profileImageURL} alt="" />
              ) : (
                <PersonCircle size={200} id="default-avatar" />
              )}

              <div className="profileName">
                {fetchedData?.userInfo.name
                  ? fetchedData?.userInfo.name
                  : 'Username'}
              </div>
            </div>
          </div>
          <TabMenu />
        </div>
      </Suspense>
    </Page>
  );
};

export default Profile;
