import React from 'react';

const LeftContent = ({ userId, userProfileInfo }) => {
  return (
    <div className="notifi-left-content">
      <img src={userProfileInfo?.userInfo.profileImageURL} alt="" />
      <div className="notifi-left-name">{userProfileInfo?.userInfo.name}</div>
      <div className="skill-content">
        <div id="userLink">
          <span>Your Flens link:</span> flens.com/{userId}
        </div>
        <div>
          <span>Favourites:</span> Camera, Portrait
        </div>
        <div>
          <span>Skills:</span> Portrait photography
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
