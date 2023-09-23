import { Avatar } from '../../../../assets/icons/icons';
import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg';
import Button from '../../../../components/Button/ButtonCustom';
import { useAuthState } from '../../../../context/AuthContext';
import { useAuthDispatch } from '../../../../context/AuthContext';
import { updateProfileUser } from '../../../../context/actions/AuthActions';
import { useUpdateProfileLazy } from '../../../../graphql/useUser';
import { useUserProfileImage } from '../../../../graphql/useUser';
import { uploadAvatarToAWS } from '../../../../hooks/useUploadImageToAWS';
import { handleFileChange } from '../../../../utils/useHandleFileChange';
import './EditProfile.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { id: userId } = useAuthState();

  const { fetchedData: fetchedImage } = useUserProfileImage({
    userInfoData: { userId },
  });

  const fileInputAvatarRef = useRef(null);
  const fileInputCoverRef = useRef(null);

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');

  const [previewImageAvatar, setPreviewAvatar] = useState(null);
  const [previewImageCover, setPreviewCoverImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);

  const { updateProfile, isFetching, fetchError } = useUpdateProfileLazy();

  useEffect(() => {
    setPreviewAvatar(fetchedImage?.userInfo.profileImageURL);
    setPreviewCoverImage(fetchedImage?.userInfo.backgroundImageURL);
  }, [fetchedImage]);

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    const avatar = selectedAvatar
      ? await uploadAvatarToAWS(selectedAvatar)
      : null;
    const background = selectedCover
      ? await uploadAvatarToAWS(selectedCover)
      : null;

    try {
      const result = await updateProfile({
        variables: {
          updateUserData: {
            userId,
            profileImageURL: avatar ? avatar.Location : previewImageAvatar,
            backgroundImageURL: background
              ? background.Location
              : previewImageCover,
          },
        },
      });

      updateProfileUser(dispatch, result.data.updateUser.profileImageURL);
    } catch (e) {
      throw e;
    }

    if (!fetchError) {
      toast.info('Edit profile sucessfull!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="above-content">
        <div className="change-avatar-img">
          {previewImageAvatar ? (
            <img src={previewImageAvatar} alt="" />
          ) : (
            <div className="default-edit-avatar">
              <Avatar size={200} color={'#f08080'} />
            </div>
          )}

          <div className="edit-avatar-image">
            <label
              className="custom-file-input"
              type="button"
              onClick={() => fileInputAvatarRef.current.click()}
            >
              Change avatar image
            </label>

            <input
              type="file"
              id="fileInput"
              ref={fileInputAvatarRef}
              onChange={(event) =>
                handleFileChange(event, setPreviewAvatar, setSelectedAvatar)
              }
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
              onClick={() => fileInputCoverRef.current.click()}
            >
              Change cover image
            </label>
            <input
              type="file"
              id="fileInput"
              ref={fileInputCoverRef}
              onChange={(event) =>
                handleFileChange(event, setPreviewCoverImage, setSelectedCover)
              }
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
