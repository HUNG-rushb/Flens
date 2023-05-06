const PostTeachnical = ({ item, showImageDetail}) => {
  const check = !showImageDetail? 1:2
  return (
    <div className= {check===1? "post-information" : "post-information-2" }>
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
