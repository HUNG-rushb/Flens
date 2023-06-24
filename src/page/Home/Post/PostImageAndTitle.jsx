const PostImageAndTitle = ({ item, handleShowImageDetail }) => {
  return (
    <div className="post-image-and-tittle">
      <div className="image-post">
      <img src={item.image.url} alt="post" onClick={handleShowImageDetail}/>

      </div>
      <div className="post-title">{item.title}</div>
    </div>
  );
};

export default PostImageAndTitle;
