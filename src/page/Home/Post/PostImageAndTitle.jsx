const PostImageAndTitle = ({ item, toggleImageDetail, setItemShowDetail }) => {
  const handleClickToShowDetail = () => {
    setItemShowDetail(item);
    toggleImageDetail();
  };
  return (
    <div className="post-image-and-tittle">
      <div className="image-post">
        <img src={item.image.url} alt="" onClick={handleClickToShowDetail} />
      </div>
      <div className="post-title">{item.title}</div>
    </div>
  );
};

export default PostImageAndTitle;
