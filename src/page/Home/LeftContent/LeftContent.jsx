import { useAuthState } from '../../../context/AuthContext';
import { useUserProfileImage } from '../../../graphql/useUser';
import './styles.scss';
import { useMemo } from 'react';

const LeftHomeContent = () => {
  const { id: userId } = useAuthState();

  const { fetchedData: fetchedImage } = useUserProfileImage({
    userInfoData: { userId },
  });

  return useMemo(
    () => (
      <div className="left-container">
        <div className="left-content">
          <img
            src={fetchedImage?.userInfo.profileImageURL}
            id="user-avatar"
            alt=""
          />
          <div id="username">{fetchedImage?.userInfo.name}</div>
          <div className="skill">
            <div id="userLink">
              <span>Your Flens link:</span> flens.com/{userId}
            </div>
            <div>
              <span>Experiences:</span> Camera, Portrait
            </div>
            <div>
              <span>Skills:</span> Portrait photography
            </div>
          </div>
        </div>
      </div>
    ),
    [
      fetchedImage?.userInfo.name,
      fetchedImage?.userInfo.profileImageURL,
      userId,
    ]
  );
};

export default LeftHomeContent;
