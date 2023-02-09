import React from 'react';
import '../components/Proflie/Profile.css';
import { Tab, Tabs } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import CoverImage from '../assets/profileCoverImage.jpg';

export default function Profile() {
  return (
    <div className="profilePage">
      <div className="overlay"></div>
      <img src={CoverImage} alt="" className="coverImage"></img>
      <div className="peronalInfor">
        <div className="coverImageContent">
          <PersonCircle size="sm" className="profileAvatar" />
          <div className="profileName">Nguyen Van A</div>
        </div>
      </div>

      <div className="profile-tabs">
        <Tabs defaultActiveKey="Activity">
          <Tab eventKey="Activity" title="Activity">
            <div>Activity tab</div>
          </Tab>
          <Tab eventKey="Biography" title="Biography">
            <div>Biography tab</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
