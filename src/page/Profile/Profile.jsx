import CoverImage from '../../assets/images/Profile/profileCoverImage.jpg';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useGetAllUserPostInfo } from '../../graphql/usePost';
import { useUserProfileImage } from '../../graphql/useUser';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';
import TabMenu from './Tabs/Tabs';
import './styles.scss';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();
  const [checkType, setCheckType] = useState('');

  const {
    isFetching: fetchingProfileData,
    fetchedData: UserProfileData,
    fetchError: fetchUserProfileError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  const { isFetching, fetchedData, fetchError } = useGetAllUserPostInfo({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });

  const data = useMemo(
    () => [
      {
        userId: 1,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
      {
        userId: 2,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
      {
        userId: 3,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
      {
        userId: 4,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
      {
        userId: 5,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
      {
        userId: 6,
        username: 'username',
        avatar: 'https://via.placeholder.com/120x120',
      },
    ],
    []
  );

  const handleFollow = () => {
    // handle follow
  };

  const handleUnFollow = () => {
    // handle Unfollow
  };

  const modalTitle = checkType === 'Following' ? 'Following' : 'Followers';
  const modalContent = useCallback(() => {
    return (
      <div className="follow-list-wrapper">
        {data.map((item, index) => (
          <div className="follow-item" key={item.userId + index}>
            <img id="follow-list-avatar" src={item.avatar} alt="" />
            <span id="follow-list-username">{item.username}</span>
            {checkType === 'Following' ? (
              <Button
                text="Unfollow"
                id="unfollow-button"
                onClick={handleUnFollow}
              />
            ) : (
              <Button
                text="Follow"
                id="follow-back-button"
                onClick={handleFollow}
              />
            )}
          </div>
        ))}
      </div>
    );
  }, [checkType, data]);

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
                      0 Following
                    </span>
                    <span id="sub-text">|</span>
                    <span
                      id="sub-text"
                      onClick={() => [
                        setCheckType('Follower'),
                        toggleShowModal(),
                      ]}
                    >
                      0 Followers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <TabMenu
              posts={fetchedData}
              userId={userId}
              userProfileData={UserProfileData}
            />
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
      fetchingProfileData,
      UserProfileData,
      fetchedData,
      userId,
      showModal,
      modalTitle,
      modalContent,
      toggleShowModal,
    ]
  );
};

export default Profile;
