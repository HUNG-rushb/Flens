import { useAuthState } from '../../../context/AuthContext.js';
import Activity from './ActivityTab.jsx';
import Biography from './Biography.jsx';
import Portfoio from './Portfolio.jsx';
import './Tabs.css';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';

const TabMenu = ({ userId }) => {
  const [isFollow, setIsFollow] = useState(false);

  // const { id: userId } = useAuthState();
  const location = useLocation();

  const checkPath = location.pathname.split('/');
  const checkId = checkPath[2];

  const handleClickFollow = () => {
    setIsFollow((prev) => !prev);
  };

  const handleClickMessageIntab = () => {
    console.log('click message button');
  };

  return (
    <>
      <div className="profile-tabs">
        <Tabs defaultActiveKey="Portfolio">
          <Tab eventKey="Activity" title="Activity">
            <Activity userId={userId} />
          </Tab>
          <Tab eventKey="Portfolio" title="Portfolio">
            <Portfoio userId={userId} />
          </Tab>
          <Tab eventKey="Biography" title="Biography">
            <Biography userId={userId} />
          </Tab>
        </Tabs>
      </div>
      {userId !== checkId && (
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
  );
};

export default TabMenu;
