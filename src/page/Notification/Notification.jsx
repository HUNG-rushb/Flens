import Button from '../../components/Button/Button';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import LeftContent from './LeftContent.jsx';
import './Notification.css';
import { useCallback, useEffect } from 'react';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { HeartFill, ReplyFill } from 'react-bootstrap-icons';

const Notification = () => {
  const { id: userId } = useAuthState();
  const {
    isFetching: isFetchingUserProfileData,
    fetchedData: fetchingUserProfileData,
    fetchError: fetchUserProfileError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  const notifi_data = [
    {
      id: 1,
      name: 'Tom',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '2 minutes ago',
      type: 1,
    },
    {
      id: 2,
      name: 'Thomas',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '3 minutes ago',
      type: 2,
    },
    {
      id: 3,
      name: 'John',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '5 minutes ago',
      type: 3,
    },
    {
      id: 4,
      name: 'Tom',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '2 minutes ago',
      type: 1,
    },
    {
      id: 5,
      name: 'Thomas',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '3 minutes ago',
      type: 2,
    },
    {
      id: 6,
      name: 'John',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '5 minutes ago',
      type: 3,
    },
    {
      id: 7,
      name: 'Tom',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '2 minutes ago',
      type: 1,
    },
    {
      id: 8,
      name: 'Thomas',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '3 minutes ago',
      type: 2,
    },
    {
      id: 9,
      name: 'John',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '5 minutes ago',
      type: 3,
    },
    {
      id: 10,
      name: 'Tom',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '2 minutes ago',
      type: 1,
    },
    {
      id: 11,
      name: 'Thomas',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '3 minutes ago',
      type: 2,
    },
    {
      id: 12,
      name: 'John',
      image: fetchingUserProfileData?.userInfo.profileImageURL,
      time: '5 minutes ago',
      type: 3,
    },
  ];

  const notificationsPerPage = 3;
  const [notifyToDisplay, setNotifyToDisplay] = useState(notificationsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickFollowBack = () => {
    console.log('click');
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;

    if (!isLoading && scrollPosition >= scrollHeight - 100) {
      setIsLoading(true);
      setTimeout(() => {
        setNotifyToDisplay((prevCount) => prevCount + notificationsPerPage);
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Page title='Flens-Notification'>
      <Suspense fallback={null}>
        <div className="Notifi-page">
          <LeftContent
            userId={userId}
            userProfileInfo={fetchingUserProfileData}
          />
          <div className="notifi-right-content">
            <div className="notify-title">Notifications</div>
            <div className="notifi-content">
              {notifi_data.slice(0, notifyToDisplay).map((item) => {
                return (
                  <div className="noti-card" key={item.id}>
                    <div className="upper-content">
                      <img src={item.image} alt="" id="image-user-react" />
                      <div className="card-notify-content">
                        {item.type === 1 ? (
                          <div className="name">
                            <span>{item.name}</span> Followed you.
                          </div>
                        ) : (
                          <div className="name">
                            <span>{item.name}</span>
                            {item.type === 2 ? (
                              <>
                                Liked <HeartFill color="red" size={25} /> your
                                post.
                              </>
                            ) : (
                              <>
                                Shared{' '}
                                <ReplyFill
                                  color="blue"
                                  size={28}
                                  className="mb-1"
                                />{' '}
                                your post.
                              </>
                            )}
                          </div>
                        )}
                        <div>{item.time}</div>
                      </div>
                      {item.type === 1 ? (
                        <div className="button-follow-back">
                          <Button
                            text="Follow back"
                            type="default3"
                            onClick={handleClickFollowBack}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {item.type === 1 ? (
                      <div className="below-content">
                        Both following Jane, Bobs and 35 others
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
            {isLoading && <p>Loading ...</p>}
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Notification;
