import unixToDateTime from '../../../utils/unixToDateTime';

const PostHeader = ({ item }) => {
  return (
    <div className="post-header">
      {/* <img src={item.avatar} alt="post-avatar" /> */}
      <div>
        <span>Hung</span>
        uploaded a photo
        <div>{unixToDateTime(item.createdAt)}</div>
      </div>
    </div>
  );
};

export default PostHeader;
