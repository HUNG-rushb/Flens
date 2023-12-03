import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import ErrorPopup from '../../utils/errorPopup';
import Loading from '../../utils/useLoading';
import React, { useMemo } from 'react';

const LeftContent = () => {
  const { id: userId } = useAuthState();
  const {
    isFetching,
    fetchedData: profileData,
    fetchError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  return useMemo(
    () => (
      <div className="noty-left-content">
        <img
          src={profileData?.userInfo.profileImageURL}
          width={150}
          height={150}
          alt=""
        />
        <div className="username">{profileData?.userInfo.name}</div>
        <div className="skill">
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
        <Loading loading={isFetching} />
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </div>
    ),
    [
      profileData?.userInfo.profileImageURL,
      profileData?.userInfo.name,
      userId,
      isFetching,
      fetchError?.message,
    ]
  );
};

export default LeftContent;
