import unixToDateTime from '../../../utils/unixToDateTime';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ item, userId }) => {
  const navigate = useNavigate();

  const handleClickToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="post-header">
      <img
        src={item.userId.profileImageURL}
        alt=""
        onClick={handleClickToProfile}
      />

      <div>
        <span>{item.userId.name}</span>
        uploaded a photo
        <div>{unixToDateTime(item.createdAt)}</div>
      </div>
    </div>
  );
};

export default PostHeader;
