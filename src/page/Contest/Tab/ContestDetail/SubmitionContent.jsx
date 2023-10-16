import { handleFileChange } from '../../../../utils/useHandleFileChange';
import './styles.scss';
import React, { useMemo, useRef } from 'react';
import { useState } from 'react';

const SubmitionContent = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  return useMemo(
    () => (
      <div className="contest-submition">
        <div className="box-content">
          <div className="submition-content">
            <div className="input-fields">
              <label>Full name</label>
              <input type="text" placeholder="Enter your full name" />
              <label>Email</label>
              <input type="text" placeholder="Enter your email" />
              <label>Title</label>
              <input type="text" placeholder="Enter your image title" />
            </div>

            {!previewImage && (
              <div>
                <div className="custom-input-image-to-album">
                  <label
                    onClick={() => fileInputRef.current.click()}
                    type="button"
                    id="custom-image-to-album"
                  >
                    Choose your image
                  </label>
                </div>
                <input
                  type="file"
                  id="fileInputNewAlbum"
                  ref={fileInputRef}
                  onChange={(event) =>
                    handleFileChange(event, setPreviewImage, setSelectedFile)
                  }
                />
              </div>
            )}

            <img src={previewImage} alt="" id="selected-image" />
          </div>
          <div className="warning-text">
            <span>*</span> Please note that: your must use your own photo, we
            will check that, if we detect your using another user photo, you
            must suffer to penalties according to our community policy!
          </div>
        </div>
      </div>
    ),
    [previewImage]
  );
};

export default SubmitionContent;
