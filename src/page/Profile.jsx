import React from 'react';
import '../components/Proflie/Profile.css';
import {Tab, Tabs} from 'react-bootstrap' 
import { PersonCircle } from 'react-bootstrap-icons';
import CoverImage from '../assets/profileCoverImage.jpg';
import Activity from '../components/Proflie/ActivityTab.jsx'
import Portfolio from '../components/Proflie/PortfolioTab.jsx'
import Bio from '../components/Proflie/BioTab.jsx'

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
    
        <Tabs defaultActiveKey='Activity'>
          <Tab eventKey='Activity' title='Activity'><Activity/></Tab>
          <Tab eventKey='Portfolio' title='Portfolio'><Portfolio/></Tab>
          <Tab eventKey='Bio' title='Bio'><Bio/></Tab>
        </Tabs>
      </div>
    </div>
  );
}
