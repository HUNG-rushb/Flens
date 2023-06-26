import unixToDateTime from '../../../utils/unixToDateTime';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ item }) => {
  const navigate = useNavigate();

  const handleClickToProfile = () => {
    navigate(`/profile/${item.userId.id}`);
  };

  return (
    <div className="post-header">
      <img
        className="post-header"
        // style cho nay lai
        src={item.userId.profileImageURL}
        alt="post-avatar"
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
