import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useGetNotis } from '../../graphql/useNoti';
import unixToDateTime from '../../utils/unixToDateTime.js';
import LeftContent from './LeftContent.jsx';
import './styles.scss';
import { useCallback, useMemo } from 'react';
import React, { Suspense } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { id: userId } = useAuthState();
  const navigate = useNavigate();
  const { fetchedData: notis, refetch } = useGetNotis({ data: { userId } });
  // console.log({ notis }, 'noti');

  const renderTypeNoty = (item) => {
    if (item?.type === 'POST_LIKED') {
      return (
        <span id="noty-type">
          {' '}
          liked <HeartFill color="red" size={25} /> your post. "{item.postTitle}
          "
        </span>
      );
    } else
      return (
        <span id="noty-type">
          {' '}
          has uploaded a new post. "{item?.postTitle}"
        </span>
      );
  };

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${userId}`);
  }, [navigate, userId]);

  const handleViewDetailNoty = useCallback(
    (postId) => {
      navigate(`/post/${postId}`);
    },
    [navigate]
  );

  return useMemo(
    () => (
      <Page title="Flens-Notification">
        <Suspense fallback={null}>
          <div className="noty-page">
            <LeftContent />
            <div className="noty-right-content">
              <div className="noty-title">Notifications</div>
              <div className="noty-content">
                {notis?.userNotis.map((item) => {
                  return (
                    <div
                      className="noty-card"
                      key={item?.id}
                      onClick={() => handleViewDetailNoty(item?.postId)}
                    >
                      <div className="upper-content">
                        <img
                          src={item?.userTriggerId.profileImageURL}
                          height={70}
                          width={70}
                          id="image-user-react"
                          alt=""
                        />
                        <div className="noty-card-content">
                          <div className="noty-username">
                            <span
                              id="username"
                              onClick={() => handleViewProfile}
                            >
                              {item?.userTriggerId.name}
                            </span>
                            {renderTypeNoty(item)}
                          </div>
                          <div id="noty-time">
                            {unixToDateTime(item?.createAt || '')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <img
                          src={item?.postImage}
                          width={70}
                          height={70}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [handleViewDetailNoty, handleViewProfile, notis?.userNotis]
  );
};

export default Notification;
