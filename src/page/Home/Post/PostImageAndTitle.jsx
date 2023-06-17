const PostImageAndTitle = ({ item, handleShowImageDetail }) => {
  return (
    <div className="post-image-and-tittle">
      <img src={item.image.url} alt="post" onClick={handleShowImageDetail} id="image-post" />
      <div id="post-title">{item.title}</div>
      {/* <div id="post-detail">{item.content}</div> */}
    </div>
  );
};

export default PostImageAndTitle;
