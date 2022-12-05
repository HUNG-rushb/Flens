import React from 'react';
import '../components/Proflie/Profile.css';
// import { Col, Row } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import CoverImage from '../assets/profileCoverImage.jpg'

export default function Profile() {
  return (
    <>
      <img src={CoverImage} alt='' className='coverImage'></img>
      <div className="peronalInfor">
        <div className="profileAvatar">
          <PersonCircle />
        </div>
        <div className="profileName">Nguyen Van A</div>
      </div>
      <div className="profile-tabs">
        <div>Activity</div>
        <div>PORTFOLIO</div>
        <div>BIO</div>
      </div>
    </>
  );
}
