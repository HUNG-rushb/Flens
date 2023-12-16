import {
  useGetUserFollowing,
  useUpdateFollowing,
  useUnfollowUser,
} from '../../../graphql/useUser.js';
import { useGetAllChatCurrentUser } from '../../../graphql/useUser.js';
import Biography from './Biography.jsx';
import Portfoio from './Portfolio.jsx';
import Posts from './Posts.jsx';
import Stories from './Stories';
import './styles.scss';
import { useCallback, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const TabMenu = ({ userId, userProfileData, posts, currentUserId }) => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  // console.log({ isFollow });

  const { fetchedData: currentUserFollowings } = useGetUserFollowing(
    {
      userFollowingInfoData: { userId: currentUserId },
    },
    userId,
    setIsFollow
  );

  const { updateFollowing } = useUpdateFollowing();
  const { unfollowUser } = useUnfollowUser();

  const { isNewChat } = useGetAllChatCurrentUser({
    chatInfoByUserIdData: {
      userIDs: [currentUserId, userId],
    },
  });
  // console.log({ isNewChat });

  const handleClickFollow = useCallback(
    async (event) => {
      event.preventDefault();

      // console.log({ isFollow }, ' here');

      if (isFollow) {
        // console.log('unfollow');

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
        // console.log('follow');

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
    [currentUserId, isFollow, unfollowUser, updateFollowing, userId]
  );

  const handleClickMessageIntab = useCallback(() => {
    navigate('/message', { state: { userId, isNewChat } });
  }, [isNewChat, navigate, userId]);

  return useMemo(
    () => (
      <>
        <div className="profile-tabs">
          <Tabs defaultActiveKey="Biography">
            <Tab eventKey="Posts" title="Posts">
              <Posts />
            </Tab>

            <Tab eventKey="Stories" title="Stories">
              <Stories />
            </Tab>

            <Tab eventKey="Portfolio" title="Portfolio">
              <Portfoio userProfileData={userProfileData} posts={posts} />
            </Tab>

            <Tab eventKey="Biography" title="Biography">
              {userProfileData && <Biography userId={userId} posts={posts} />}
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
      userProfileData,
      posts,
      userId,
      currentUserId,
      handleClickFollow,
      isFollow,
      handleClickMessageIntab,
    ]
  );
};

export default TabMenu;
