const PostImageAndTitle = ({ item, handleShowImageDetail }) => {
  return (
    <div>
      <img src={item.image} alt="post" onClick={handleShowImageDetail} />
      <div id="post-title">{item.title}</div>
      <div id="post-detail">{item.content}</div>
    </div>
  );
};

export default PostImageAndTitle;
