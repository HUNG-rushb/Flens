import Button from '../../../../components/Button/ButtonCustom';
import { useAuthState } from '../../../../context/AuthContext';
import { useUpdateProfileLazy } from '../../../../graphql/useUser';
import { useUserProfileImage } from '../../../../graphql/useUser';
import { uploadAvatarToAWS } from '../../../../hooks/useUploadImageToAWS';
import './EditProfile.css';
import React, { useEffect, useRef, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg'

const EditProfile = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();

  const { fetchedData: fetchedImage } = useUserProfileImage({
    userInfoData: { userId },
  });

  const fileInputAvatarRef = useRef(null);
  const fileInputCoverRef = useRef(null);

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');

  const [previewImageAvatar, setPreviewAvatarImage] = useState(null);
  const [previewImageCover, setPreviewCoverImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);

  const { updateProfile, isFetching, fetchError } = useUpdateProfileLazy();

  useEffect(() => {
    setPreviewAvatarImage(fetchedImage?.userInfo.profileImageURL);
    setPreviewCoverImage(fetchedImage?.userInfo.backgroundImageURL);
  }, [fetchedImage]);

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
    setSelectedAvatar(file);
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
    setSelectedCover(file);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    const avatar = await uploadAvatarToAWS(selectedAvatar);
    const background = await uploadAvatarToAWS(selectedCover);

    try {
      await updateProfile({
        variables: {
          updateUserData: {
            userId,
            profileImageURL: avatar.Location,
            backgroundImageURL: background.Location,
          },
        },
      });
    } catch (e) {
      throw e;
    }

    if (!fetchError) {
      navigate('/profile');
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="above-content">
        <div className="change-avatar-img">
          {previewImageAvatar ? (
            <img src={previewImageAvatar} alt="edit-avatar" />
          ) : (
            <PersonCircle size={200} color='#f08080' id='default-edit-avatar' />
          )}

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
          
          <img src={previewImageCover? previewImageCover : CoverImage} alt="edit-cover" width={'400px'} />
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
            // disable={
            //   previewImageAvatar === null || previewImageCover === null
            //     ? 'true'
            //     : 'false'
            // }
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
