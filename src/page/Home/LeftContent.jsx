import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';

const LeftHomeContent = () => {
  const { id: userId } = useAuthState();

  const { fetchedData: fetchedImage } = useUserProfileImage({
    userInfoData: { userId },
  });

  return (
    <div className="container-left-content">
      <div className="left-content">
        <img src={fetchedImage?.userInfo.profileImageURL} alt="avatar" />

        <div className="name">{fetchedImage?.userInfo.name}</div>

        {/* <div className="skill-content">
          <div>
            <span>Your Flens link:</span> flens.com/quocthanhh
          </div>

          <div>
            <span>Favourites:</span> Camera, Portrait
          </div>

          <div>
            <span>Skills:</span> Portrait photography
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftHomeContent;
