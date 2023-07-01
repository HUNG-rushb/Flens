import React from "react";

const PostTeachnical = ({ item, showImageDetail }) => {
  return (
    <div
      className={!showImageDetail ? 'post-information' : 'post-information-2'}
    >
      <div>
        <span>Camera:</span> {item?.image.imageInfoId.camera}
      </div>

      <div>
        <span>Aperture:</span> {item?.image.imageInfoId.aperture}
      </div>

      <div>
        <span>Focal Length:</span> {item?.image.imageInfoId.focalLength}
      </div>

      <div>
        <span>Shutter Speed:</span> {item?.image.imageInfoId.shutterSpeed}
      </div>

      <div>
        <span>ISO:</span> {item?.image.imageInfoId.ISO}
      </div>

      <div>
        <span>Date Taken:</span> {item?.image.imageInfoId.takenWhen}
      </div>

      <div>
        <span>CopyRight:</span> {item?.image.imageInfoId.copyRight}
      </div>
    </div>
  );
};

export default PostTeachnical;
