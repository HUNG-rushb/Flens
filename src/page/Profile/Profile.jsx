import './Profile.css';
import { Suspense } from 'react';
import TabMenu from './Tabs/Tabs';
import { useParams } from 'react-router-dom';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useUserProfileImage } from '../../graphql/useUser';
import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';


const Profile = () => {
  const { userId } = useParams();
  const { isFetching, fetchedData, fetchError } = useUserProfileImage({
    userInfoData: { userId },
  });
  console.log({ fetchedData });

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
