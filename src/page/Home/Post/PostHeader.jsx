const PostHeader = ({ item }) => {
  return (
    <div className="post-header">
      <img src={item.avatar} alt="post-avatar" />
      <div>
        <span>{item.name}</span>
        uploaded a photo
        <div>{item.time}</div>
      </div>
    </div>
  );
};

export default PostHeader;
