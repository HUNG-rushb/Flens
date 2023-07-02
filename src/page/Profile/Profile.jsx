import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useGetAllUserPost } from '../../graphql/usePost';
import { useUserProfileImage } from '../../graphql/useUser';
import './Profile.css';
import TabMenu from './Tabs/Tabs';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const {
    isFetching: isFetchingUserProfileData,
    fetchedData: fetchingUserProfileData,
    fetchError: fetchUserProfileError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });
  const {
    isFetching: isFetchingUserAllPost,
    fetchedData: fetchUserAllPostData,
    fetchError: fetchingUserAllPostError,
  } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });

  return (
    <Page title={'Flens-Profile'}>
      <Suspense>
        {isFetchingUserProfileData ? (
          <Spinner />
        ) : (
          <div className="profilePage">
            <div className="overlay"></div>
            <img
              id="coverImage"
              src={
                fetchingUserProfileData?.userInfo.backgroundImageURL
                  ? fetchingUserProfileData?.userInfo.backgroundImageURL
                  : CoverImage
              }
              alt=""
            />
            <div className="peronalInfor">
              <div className="profileAvatar">
                <img
                  src={fetchingUserProfileData?.userInfo.profileImageURL}
                  alt=""
                />

                <div className="profileName">
                  {fetchingUserProfileData?.userInfo.name
                    ? fetchingUserProfileData?.userInfo.name
                    : 'Username'}
                </div>
              </div>
            </div>
            <TabMenu
              userId={userId}
              userProfileData={fetchingUserProfileData}
              userAllPostData={fetchUserAllPostData}
            />
          </div>
        )}
      </Suspense>
    </Page>
  );
};

export default Profile;
