import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useGetAllUserPostInfo } from '../../graphql/usePost';
import { useUserProfileImage } from '../../graphql/useUser';
import TabMenu from './Tabs/Tabs';
import './styles.scss';
import { Suspense, useMemo } from 'react';
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

  const { isFetching, fetchedData, fetchError } = useGetAllUserPostInfo({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });

  return useMemo(
    () => (
      <Page title="Flens-Profile">
        <Suspense>
          {isFetchingUserProfileData ? (
            <Spinner />
          ) : (
            <div className="profile">
              <div className="overlay"></div>
              <img
                src={
                  fetchingUserProfileData?.userInfo.backgroundImageURL
                    ? fetchingUserProfileData?.userInfo.backgroundImageURL
                    : CoverImage
                }
                id="coverImage"
                alt=""
              />
              <div className="peronalInfor">
                <div className="profileAvatar">
                  <img
                    src={fetchingUserProfileData?.userInfo.profileImageURL}
                    alt=""
                  />

                  <p id="profile-name">
                    {fetchingUserProfileData?.userInfo.name
                      ? fetchingUserProfileData?.userInfo.name
                      : 'Username'}
                  </p>
                </div>
              </div>

              <TabMenu
                posts={fetchedData}
                userId={userId}
                userProfileData={fetchingUserProfileData}
              />
            </div>
          )}
        </Suspense>
      </Page>
    ),
    [fetchingUserProfileData, isFetchingUserProfileData, userId, fetchedData]
  );
};

export default Profile;
