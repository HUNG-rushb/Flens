import { useAuthState } from '../../../../context/AuthContext';
import { useCreatePostLazy } from '../../../../graphql/usePost';
import { handleFileChange } from '../../../../utils/useHandleFileChange';
import './styles.scss';
import React, { useMemo, useRef } from 'react';
import { useState } from 'react';

const SubmitionContent = ({ contestId }) => {
  const { id: userId } = useAuthState();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { createPost } = useCreatePostLazy();

  return useMemo(
    () => (
      <div className="contest-submition">
        <div className="box-content">
          <div className="submition-content">
            <div className="input-fields">
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
        </div>
      </div>
    ),
    [previewImage]
  );
};

export default SubmitionContent;
