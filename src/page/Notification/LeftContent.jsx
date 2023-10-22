import React, { useMemo } from 'react';

const LeftContent = ({ userId, userProfileInfo }) => {
  return useMemo(
    () => (
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
    ),
    [
      userId,
      userProfileInfo?.userInfo.name,
      userProfileInfo?.userInfo.profileImageURL,
    ]
  );
};

export default LeftContent;
