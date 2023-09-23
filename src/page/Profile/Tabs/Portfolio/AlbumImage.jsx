import ModalCustom from '../../../../components/Modal/ModalCustom';
import useModal from '../../../../hooks/useModal';
import { handleFileChange } from '../../../../utils/useHandleFileChange';
import React, { useRef, useState } from 'react';

const AlbumImage = ({ userProfileData, setComponentToRender }) => {
  const { isShowing: openCreateAlbum, toggle: toggleCreateAlbum } = useModal();
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  const fakeAlbum = [
    {
      id: 1,
      image: userProfileData?.userInfo.profileImageURL,
      title: 'Avatar',
    },
    {
      id: 2,
      image: userProfileData?.userInfo.backgroundImageURL,
      title: 'Cover image',
    },
  ];

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreateAlbum = () => {
    toggleCreateAlbum();
  };

  const modalContent = () => {
    return (
      <div className="up-new-album">
        <div className="album-new-title">
          <label htmlFor="">Album title</label>
          <input
            type="text"
            placeholder="Enter album title"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
        </div>

        <div className="custom-input-image-to-album">
          <label
            onClick={() => fileInputRef.current.click()}
            type="button"
            id="custom-image-to-album"
          >
            Choose 1 image for new album
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
        <img src={previewImage} alt="" id="image-to-album" />
      </div>
    );
  };

  return (
    <div className="album">
      <div className="album-title">
        <span>Album </span>
      </div>
      {userProfileData && (
        <div className="album-images">
          <div>
            <div className="new-album" onClick={toggleCreateAlbum}>
              +
            </div>
            <span id="child-album-title">Create album</span>
          </div>
          {fakeAlbum.map((album) => (
            <div
              key={album.id}
              className="child-album"
              onClick={() => setComponentToRender(1)}
            >
              <img src={album.image} alt="" />
              <span id="child-album-title">{album.title}</span>
            </div>
          ))}
        </div>
      )}
      <ModalCustom
        show={openCreateAlbum}
        modalTitle={'Create new album'}
        modalContent={modalContent()}
        handleClose={() => [toggleCreateAlbum(), setPreviewImage(null)]}
        handleSavechanges={handleCreateAlbum}
      />
    </div>
  );
};

export default AlbumImage;
