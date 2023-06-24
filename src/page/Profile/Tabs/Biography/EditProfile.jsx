import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg';
import Avatar from '../../../../assets/images/avatar.jpg';
import Button from '../../../../components/Button/ButtonCustom';
import './EditProfile.css';
import React, { useRef, useState } from 'react';

const EditProfile = () => {
  const fileInputAvatarRef = useRef(null);
  const fileInputCoverRef = useRef(null);

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');

  const [previewImageAvatar, setPreviewAvatarImage] = useState(null);
  const [previewImageCover, setPreviewCoverImage] = useState(null);

  const handleFileAvatarSelect = () => {
    fileInputAvatarRef.current.click();
  };

  const handleFileCoverSelect = () => {
    fileInputCoverRef.current.click();
  };

  const handleFileChangeAvatar = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewAvatarImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChangeCover = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewCoverImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="edit-profile-page">
      <div className="above-content">
        <div className="change-avatar-img">
          <img
            src={previewImageAvatar ? previewImageAvatar : Avatar}
            alt="edit-avatar"
          />
          <div className="edit-avatar-image">
            <label
              className="custom-file-input"
              type="button"
              onClick={handleFileAvatarSelect}
            >
              Change avatar image
            </label>

            <input
              type="file"
              id="fileInput"
              ref={fileInputAvatarRef}
              onChange={handleFileChangeAvatar}
            />
          </div>
        </div>
        <div className="change-cover-image">
          <img
            src={previewImageCover ? previewImageCover : CoverImage}
            alt="edit-cover"
            width={'400px'}
          />
          <div className="edit-cover-image">
            <label
              className="custom-file-input"
              type="button"
              onClick={handleFileCoverSelect}
            >
              Change cover image
            </label>
            <input
              type="file"
              id="fileInput"
              ref={fileInputCoverRef}
              onChange={handleFileChangeCover}
            />
          </div>
        </div>
      </div>
      <form className="below-edit-content">
        <div>
          <label>Name</label>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Birthday</label>
          <div>
            <input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            text={'Save changes'}
            type="save-change-edit"
            onClick={(e) => handleSaveEdit(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
