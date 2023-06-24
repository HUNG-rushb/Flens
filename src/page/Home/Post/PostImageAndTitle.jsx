const PostImageAndTitle = ({ item, handleShowImageDetail }) => {
  return (
    <div className="post-image-and-tittle">
      <img src={item.image.url} alt="post" onClick={handleShowImageDetail} id="image-post" />
      <div className="post-title">{item.title}</div>
    </div>
  );
};

export default PostImageAndTitle;
