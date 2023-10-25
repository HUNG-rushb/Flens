import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useGetNewFeed } from '../../graphql/usePost';
import { useUserProfileImage } from '../../graphql/useUser';
import TabMenu from './Tabs/Tabs';
import './styles.scss';
import { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  console.log(userId);

  const {
    isFetching: isFetchingUserProfileData,
    fetchedData: fetchingUserProfileData,
    fetchError: fetchUserProfileError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetNewFeed(userId);

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
                userId={userId}
                userProfileData={fetchingUserProfileData}
                posts={posts}
                hasNextPage={hasNextPage}
                loadNew={loadNew}
              />
            </div>
          )}
        </Suspense>
      </Page>
    ),
    [
      fetchingUserProfileData,
      hasNextPage,
      isFetchingUserProfileData,
      loadNew,
      posts,
      userId,
    ]
  );
};

export default Profile;
