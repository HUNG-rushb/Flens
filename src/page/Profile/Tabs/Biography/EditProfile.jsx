import { Avatar } from '../../../../assets/icons/icons';
import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg';
import Button from '../../../../components/Button/Button';
import { useAuthState } from '../../../../context/AuthContext';
import { useAuthDispatch } from '../../../../context/AuthContext';
import { updateProfileUser } from '../../../../context/actions/AuthActions';
import { useUpdateProfileLazy } from '../../../../graphql/useUser';
import { useUserProfileImage } from '../../../../graphql/useUser';
import { uploadAvatarToAWS } from '../../../../hooks/useUploadImageToAWS';
import { handleFileChange } from '../../../../utils/useHandleFileChange';
import { successfullNoty } from '../../../../utils/useNotify';
import './styles.scss';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

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

  const handleSaveEdit = useCallback(
    async (event) => {
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
        successfullNoty('Edit profile sucessfull!');
        navigate(`/profile/${userId}`);
      }
    },
    [
      dispatch,
      fetchError,
      navigate,
      previewImageAvatar,
      previewImageCover,
      selectedAvatar,
      selectedCover,
      updateProfile,
      userId,
    ]
  );

  return useMemo(
    () => (
      <div className="edit-profile">
        <div className="change-image-wrapper">
          <div className="change-avatar">
            {previewImageAvatar ? (
              <img src={previewImageAvatar} alt="" id="avatar" />
            ) : (
              <Avatar size={200} color="#f08080" id="default-avatar" />
            )}

            <div className="input-wrapper">
              <label
                id="input-image"
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
              id="cover-image"
              alt=""
            />
            <div className="input-wrapper">
              <label
                id="input-image"
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
                  handleFileChange(
                    event,
                    setPreviewCoverImage,
                    setSelectedCover
                  )
                }
              />
            </div>
          </div>
        </div>
        <form className="personal-content">
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
              text="Save changes"
              id="submit-button"
              onClick={handleSaveEdit}
              // disable={
              //   previewImageAvatar === null || previewImageCover === null
              //     ? 'true'
              //     : 'false'
              // }
            />
          </div>
        </form>
      </div>
    ),
    [birthday, handleSaveEdit, name, previewImageAvatar, previewImageCover]
  );
};

export default EditProfile;
