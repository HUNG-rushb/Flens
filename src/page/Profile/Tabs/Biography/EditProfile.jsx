import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg';
import Avatar from '../../../../assets/images/avatar.jpg';
import Button from '../../../../components/Button/ButtonCustom';
import './EditProfile.css';
import React, {useRef, useState} from 'react';

const EditProfile = () => {
  const handleSaveEdit = (event) => {
    event.preventDefault();
  };

  const fileInputRef = useRef(null);

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  const [previewImageAvatar, setPreviewImage] = useState(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChangeAvatar = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);
    setSelectedAvatarFile(file);
  };

  const handleFileChangeCover = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);
    setSelectedCoverFile(file);
  };

  return (
    <div className="edit-profile-page">
      <div className="above-content">
        <div className="change-avatar">
          <img src={Avatar} alt="edit-avatar" />
          {<img src={previewImageAvatar} alt='img' /> }
          <div className="edit-avatar-image">
            <label
              className="custom-file-input"
              type="button"
              onClick={handleFileSelect}  
            >
              Change avatar image
            </label>

            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileChangeAvatar}
            />
          </div>
        </div>
        <div className="change-cover-image">
          <img src={CoverImage} alt="edit-cover" width={'400px'} />
          <div className="edit-cover-image">
            <label
              className="custom-file-input"
              type="button"
              onClick={handleFileSelect}
            >
              Change cover image
            </label>

            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileChangeCover}
            />
          </div>
        </div>
      </div>
      <form className="below-edit-content">
        <div>
          <label>Name</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Phone Number</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Birthday</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Camera</label>
          <div>
            <input type="text" name="" />
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
