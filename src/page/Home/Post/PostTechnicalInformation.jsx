import React from 'react';

const PostTechnical = ({ item, showImageDetail }) => {
  return (
    <div className={!showImageDetail ?"post-technical-content" :"post-technical-content-2"}>
      <div className={!showImageDetail ? 'post-technical' : 'post-technical-2'}>
        <div>
          <span id='post-technical-title'>Camera:</span> {item?.image.imageInfoId.camera}
        </div>
        <div>
          <span id='post-technical-title'>Aperture:</span> f/{item?.image.imageInfoId.aperture}
        </div>
        <div>
          <span id='post-technical-title'>Focal Length:</span> {item?.image.imageInfoId.focalLength} mm
        </div>
        <div>
          <span id='post-technical-title'>Shutter Speed:</span> {item?.image.imageInfoId.shutterSpeed} s
        </div>
        <div>
          <span id='post-technical-title'>ISO:</span> {item?.image.imageInfoId.ISO}
        </div>
        <div>
          <span id='post-technical-title'>Date Taken:</span> {item?.image.imageInfoId.takenWhen}
        </div>
        <div>
          <span id='post-technical-title'>CopyRight:</span> {item?.image.imageInfoId.copyRight}
        </div>
      </div>
    </div>
  );
};

export default PostTechnical;
