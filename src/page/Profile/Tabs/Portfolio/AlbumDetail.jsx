import Modal from '../../../../components/Modal/Modal';
import useModal from '../../../../hooks/useModal.jsx';
import { handleFileChange } from '../../../../utils/useHandleFileChange.js';
import './Portfolio.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThreeDots, Trash } from 'react-bootstrap-icons';

const AlbumDetail = ({ setComponentToRender, detailAlbum }) => {
  const fakeData = useMemo(
    () => [
      'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    []
  );
  const { isShowing: openUploadImage, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);

  const fileInputRef = useRef(null);
  const clickOutsideRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const modalContent = useCallback(() => {
    return (
      <div className="up-image-to-album">
        <div>
          <label
            onClick={() => fileInputRef.current.click()}
            type="button"
            id="custom-image-to-album"
          >
            Choose image to upload
          </label>
        </div>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={(event) =>
            handleFileChange(event, setPreviewImage, setSelectedFile)
          }
        />
        <img src={previewImage} alt="" id="image-to-album" />
      </div>
    );
  }, [previewImage]);

  const handleConfirmUpload = useCallback(() => {
    toggleUploadImage();
  }, [toggleUploadImage]);

  const handleClose = useCallback(() => {
    toggleUploadImage();
    setPreviewImage(null);
  }, [toggleUploadImage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListOtherActions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return useMemo(
    () => (
      <div className="Album-detail-container">
        <div>
          <button
            id="back-to-portfolio"
            onClick={() => setComponentToRender(0)}
          >
            Back
          </button>
        </div>
        <div className="album-detail-header">
          <span id="album-detail-title">{detailAlbum?.name}</span>
          <ThreeDots
            size={28}
            onClick={() => setShowListOtherActions(true)}
            ref={clickOutsideRef}
          />
          <div
            className="list-album-detail-actions"
            hidden={!showListOtherActions}
          >
            <ul>
              <li onClick={() => setShowListOtherActions(false)}>
                <Trash color="red" />
                Delete album
              </li>
            </ul>
          </div>
        </div>
        <div className="album-detail-images">
          <div className="upload-new-album-image" onClick={toggleUploadImage}>
            + Add new Image
          </div>
          {fakeData.map((item, index) => (
            <div className="album-detail-image" key={index}>
              <img src={item} alt="" />
            </div>
          ))}
        </div>
        <Modal
          show={openUploadImage}
          modalTitle="Upload image to album"
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleConfirmUpload}
        />
      </div>
    ),
    [
      detailAlbum?.name,
      fakeData,
      handleClose,
      handleConfirmUpload,
      modalContent,
      openUploadImage,
      setComponentToRender,
      showListOtherActions,
      toggleUploadImage,
    ]
  );
};

export default AlbumDetail;
