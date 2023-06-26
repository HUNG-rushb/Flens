import unixToDateTime from '../../../utils/unixToDateTime';
import { PersonCircle } from 'react-bootstrap-icons';

const PostHeader = ({ item }) => {
  return (
    <div className="post-header">
      {item.avatar ? (
        <img src={item.avatar} alt="post-avatar" />
      ) : (
        <PersonCircle size={50} color="#f08080" />
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
