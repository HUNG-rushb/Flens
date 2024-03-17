import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import { useUpdateFollowing } from '../../graphql/useUser';
import { useUnfollowUser } from '../../graphql/useUser';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';
import TabMenu from './Tabs/Tabs';
import './styles.scss';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id: currentUserId } = useAuthState();
  const { userId } = useParams();
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();
  const [checkType, setCheckType] = useState('');
  const {
    isFetching: fetchingProfileData,
    fetchedData: UserProfileData,
    userFollow,
    refetchFollow,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  const { updateFollowing } = useUpdateFollowing();
  const { unfollowUser } = useUnfollowUser();

  const handleFollow = useCallback(
    async (userId, isFollow) => {
      console.log({ userId, isFollow });

      if (!isFollow) {
        console.log('unfollow');

        try {
          await unfollowUser({
            variables: {
              unfollowUserData: {
                userId: currentUserId,
                followingId: userId,
              },
            },
          });
        } catch (e) {
          throw e;
        }
      } else {
        console.log('follow');

        try {
          await updateFollowing({
            variables: {
              updateFollowingData: {
                userId: currentUserId,
                followingId: userId,
              },
            },
          });
        } catch (e) {
          throw e;
        }
      }

      refetchFollow();
    },
    [currentUserId, refetchFollow, unfollowUser, updateFollowing]
  );

  const modalTitle = checkType === 'Following' ? 'Following' : 'Followers';

  const modalContent = useCallback(() => {
    return (
      <>
        {userFollow && (
          <div className="follow-list-wrapper">
            {checkType === 'Following'
              ? userFollow.userFollow.following.userFollowing.map((item) => (
                  <div className="follow-item" key={item.id}>
                    <img
                      id="follow-list-avatar"
                      src={item.profileImageURL}
                      alt=""
                    />
                    <span id="follow-list-username">{item.name}</span>

                    <Button
                      text="Unfollow"
                      id="unfollow-button"
                      onClick={() => {
                        handleFollow(item.id, false);
                      }}
                    />
                  </div>
                ))
              : userFollow.userFollow.follower.userFollower.map((item) => (
                  <div className="follow-item" key={item.id}>
                    <img
                      id="follow-list-avatar"
                      src={item.profileImageURL}
                      alt=""
                    />
                    <span id="follow-list-username">{item.name}</span>

                    <Button
                      text="Follow"
                      id="follow-back-button"
                      onClick={() => {
                        handleFollow(item.id, true);
                      }}
                    />
                  </div>
                ))}
          </div>
        )}
      </>
    );
  }, [checkType, handleFollow, userFollow]);

  return useMemo(
    () => (
      <Page title="Flens-Profile">
        <Suspense>
          <div className="profile">
            <div className="overlay"></div>
            <img
              src={
                UserProfileData?.userInfo.backgroundImageURL
                  ? UserProfileData?.userInfo.backgroundImageURL
                  : CoverImage
              }
              id="coverImage"
              alt=""
            />
            <div className="peronalInfor">
              <div className="profileAvatar">
                <img src={UserProfileData?.userInfo.profileImageURL} alt="" />

                <div id="profile-name">
                  {UserProfileData?.userInfo.name
                    ? String(UserProfileData?.userInfo.name).toLocaleUpperCase()
                    : 'Username'}
                  <div className="follow-wrapper">
                    <span
                      id="sub-text"
                      onClick={() => [
                        setCheckType('Following'),
                        toggleShowModal(),
                      ]}
                    >
                      {userFollow &&
                        `${userFollow.userFollow.following.userFollowing.length} Following`}
                    </span>
                    <span id="sub-text">|</span>
                    <span
                      id="sub-text"
                      onClick={() => [
                        setCheckType('Follower'),
                        toggleShowModal(),
                      ]}
                    >
                      {userFollow &&
                        `${userFollow.userFollow.follower.userFollower.length} Followers`}
                    </span>
                    <span id="sub-text">|</span>
                    <span id="sub-text">Level 0</span>
                  </div>
                </div>
              </div>
            </div>
            <TabMenu userId={userId} currentUserId={currentUserId} />
            <Modal
              size="xl"
              hideButton
              show={showModal}
              modalTitle={modalTitle}
              modalContent={modalContent()}
              handleClose={toggleShowModal}
              handleSavechanges={toggleShowModal}
            />
            <Loading loading={fetchingProfileData} />
          </div>
        </Suspense>
      </Page>
    ),
    [
      UserProfileData,
      userFollow,
      userId,
      currentUserId,
      showModal,
      modalTitle,
      modalContent,
      toggleShowModal,
      fetchingProfileData,
    ]
  );
};

export default Profile;
