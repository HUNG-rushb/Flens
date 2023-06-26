import unixToDateTime from '../../../utils/unixToDateTime';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ item }) => {
  const navigate = useNavigate();
  
  const anotherUserId = 1;
  const handleClickToProfile = () => {
    navigate(`/profile/${anotherUserId}`);
  };

  return (
    <div className="post-header">
      {item.avatar ? (
        <img
          src={item.avatar}
          alt="post-avatar"
          onClick={handleClickToProfile}
        />
      ) : (
        <PersonCircle
          size={50}
          color="#f08080"
          onClick={handleClickToProfile}
        />
      )}
      <div>
        <span>Hung</span>
        uploaded a photo
        <div>{unixToDateTime(item.createdAt)}</div>
      </div>
    </div>
  );
};

export default PostHeader;
