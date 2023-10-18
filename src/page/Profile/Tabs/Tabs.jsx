import { useAuthState } from '../../../context/AuthContext.js';
import {
  useGetUserFollowing,
  useUpdateFollowing,
  useUnfollowUser,
} from '../../../graphql/useUser.js';
import Activity from './ActivityTab.jsx';
import Biography from './Biography.jsx';
import Portfoio from './Portfolio.jsx';
import './Tabs.css';
import { useCallback, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';

const TabMenu = ({ userId, userProfileData, userAllPostData }) => {
  const { id: currentUserId } = useAuthState();
  const [isFollow, setIsFollow] = useState(false);
  console.log({ isFollow });

  const { fetchedData: currentUserFollowings } = useGetUserFollowing(
    {
      userFollowingInfoData: { userId: currentUserId },
    },
    userId,
    setIsFollow
  );

  const { updateFollowing } = useUpdateFollowing();
  const { unfollowUser } = useUnfollowUser();

  // console.log({ userId });
  // console.log({ currentUserId });
  // console.log({ userProfileData });

  const handleClickFollow = useCallback(
    async (event) => {
      event.preventDefault();

      console.log({ isFollow }, ' here');

      if (isFollow) {
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

        setIsFollow((prev) => !prev);
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

        setIsFollow((prev) => !prev);
      }
    },
    [isFollow]
  );

  const handleClickMessageIntab = useCallback(() => {
    console.log('click message button');
  }, []);

  return useMemo(
    () => (
      <>
        <div className="profile-tabs">
          <Tabs defaultActiveKey="Biography">
            <Tab eventKey="Activity" title="Activity">
              <Activity userAllPostData={userAllPostData} />
            </Tab>
            <Tab eventKey="Portfolio" title="Portfolio">
              <Portfoio
                userProfileData={userProfileData}
                userAllPostData={userAllPostData}
              />
            </Tab>
            <Tab eventKey="Biography" title="Biography">
              <Biography userId={userId} userAllPostData={userAllPostData} />
            </Tab>
          </Tabs>
        </div>

        {userId !== currentUserId && (
          <div className="follow-interactions">
            <div id="follow-unfollow-button" onClick={handleClickFollow}>
              {!isFollow ? '+ Follow' : 'Unfollow'}
            </div>

            <div id="message-button-intab" onClick={handleClickMessageIntab}>
              Message
            </div>

            <div id="list-options-intab">
              <ThreeDots color="#f08080" />
            </div>
          </div>
        )}
      </>
    ),
    [
      userId,
      currentUserId,
      handleClickFollow,
      handleClickMessageIntab,
      isFollow,
      userAllPostData,
      userId,
      userProfileData,
    ]
  );
};

export default TabMenu;
