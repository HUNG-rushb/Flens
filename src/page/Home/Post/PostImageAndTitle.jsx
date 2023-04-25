const PostImageAndTitle = ({ item }) => {
  return (
    <div>
      <img src={item.image} alt="post" />
      <div id="post-title">{item.title}</div>
      <div id="post-detail">{item.content}</div>
    </div>
  );
};

export default PostImageAndTitle;
