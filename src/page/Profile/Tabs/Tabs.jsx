import { useAuthState } from '../../../context/AuthContext';
import Activity from './ActivityTab';
import Biography from './Biography';
import Portfoio from './Portfolio';
import './Tabs.css';
import { useCallback, useMemo, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';

const TabMenu = ({ userId, userProfileData, posts, hasNextPage, loadNew }) => {
  const location = useLocation();
  const { id: checkUserId } = useAuthState();
  const [isFollow, setIsFollow] = useState(false);
  const checkPath = location.pathname.split('/');
  const checkId = checkPath[2];

  const handleClickFollow = useCallback(() => {
    setIsFollow((prev) => !prev);
  }, []);

  const handleClickMessageIntab = useCallback(() => {
    console.log('click message button');
  }, []);

  return useMemo(
    () => (
      <>
        <div className="profile-tabs">
          <Tabs defaultActiveKey="Biography">
            <Tab eventKey="Activity" title="Activity">
              <Activity
                posts={posts}
                hasNextPage={hasNextPage}
                loadNew={loadNew}
                userId={userId}
              />
            </Tab>
            <Tab eventKey="Portfolio" title="Portfolio">
              <Portfoio userProfileData={userProfileData} posts={posts} />
            </Tab>
            <Tab eventKey="Biography" title="Biography">
              <Biography userId={userId} posts={posts} />
            </Tab>
          </Tabs>
        </div>
        {checkId !== checkUserId && (
          <div className="follow-interactions">
            <div id="follow-unfollow-button" onClick={handleClickFollow}>
              {!isFollow ? '+ Follow' : 'UnFollow'}
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
      checkId,
      checkUserId,
      handleClickFollow,
      handleClickMessageIntab,
      hasNextPage,
      isFollow,
      loadNew,
      posts,
      userId,
      userProfileData,
    ]
  );
};

export default TabMenu;
