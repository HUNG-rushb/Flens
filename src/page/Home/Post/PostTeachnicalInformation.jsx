const PostTeachnical = ({ item }) => {
  return (
    <div className="post-information">
      <div>
        <span>Camera:</span> {item.technical.camera}
      </div>
      <div>
        <span>Focal length:</span> {item.technical.focalLength}
      </div>
      <div>
        <span>Shutter Speed:</span> {item.technical.shutterSpeed}
      </div>
      <div>
        <span>ISO:</span> {item.technical.iso}
      </div>
      <div>
        <span>Date:</span> {item.date}
      </div>
    </div>
  );
};

export default PostTeachnical;
