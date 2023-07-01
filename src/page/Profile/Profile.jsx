import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import './Profile.css';
import TabMenu from './Tabs/Tabs';
import { Suspense } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  // const { id: userId } = useAuthState();
  console.log("userid: ",userId)
  const { isFetching, fetchedData, fetchError } = useUserProfileImage({
    userInfoData: { userId },
  });
  console.log('fetch profile data:',{ fetchedData });

  return (
    <Page title={'Flens-Profile'}>
      <Suspense>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="profilePage">
            <div className="overlay"></div>
            <img
              id="coverImage"
              src={
                fetchedData?.userInfo.backgroundImageURL
                  ? fetchedData?.userInfo.backgroundImageURL
                  : CoverImage
              }
              alt=""
            />
            <div className="peronalInfor">
              <div className="profileAvatar">
                <img src={fetchedData?.userInfo.profileImageURL} alt="" />

                <div className="profileName">
                  {fetchedData?.userInfo.name
                    ? fetchedData?.userInfo.name
                    : 'Username'}
                </div>
              </div>
            </div>
            <TabMenu userId={userId} />
          </div>
        )}
      </Suspense>
    </Page>
  );
};

export default Profile;
