import React, { useMemo } from 'react';

const PostTechnical = ({ item, showImageDetail }) => {
  return useMemo(
    () => (
      <div
        className={
          !showImageDetail ? 'technical-wrapper' : 'technical-wrapper-2'
        }
      >
        <div
          className={
            !showImageDetail ? 'technical-content' : 'technical-content-2'
          }
        >
          <div>
            <span id="content">Camera:</span> {item?.image.imageInfoId.camera}
          </div>
          <div>
            <span id="content">Aperture:</span> f/
            {item?.image.imageInfoId.aperture} (mm)
          </div>
          <div>
            <span id="content">Focal Length:</span>
            {item?.image.imageInfoId.focalLength} (mm)
          </div>
          <div>
            <span id="content">Shutter Speed:</span>
            {item?.image.imageInfoId.shutterSpeed} (s)
          </div>
          <div>
            <span id="content">ISO: </span> {item?.image.imageInfoId.ISO}
          </div>
          <div>
            <span id="content">Date Taken: </span>
            {item?.image.imageInfoId.takenWhen}
          </div>
          <div>
            <span id="content">Lens: </span> {item?.image.imageInfoId.lens} (mm)
          </div>
          <div>
            <span id="content">CopyRight: </span>
            {item?.image.imageInfoId.copyRight}
          </div>
        </div>
      </div>
    ),
    [
      item?.image.imageInfoId.ISO,
      item?.image.imageInfoId.aperture,
      item?.image.imageInfoId.camera,
      item?.image.imageInfoId.copyRight,
      item?.image.imageInfoId.focalLength,
      item?.image.imageInfoId.lens,
      item?.image.imageInfoId.shutterSpeed,
      item?.image.imageInfoId.takenWhen,
      showImageDetail,
    ]
  );
};

export default PostTechnical;
