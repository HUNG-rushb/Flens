import Modal from '../../../../components/Modal/ModalCustom.jsx';
import useModal from '../../../../hooks/useModal.jsx';
import { handleFileChange } from '../../../../utils/useHandleFileChange.js';
import './Portfolio.css';
import React, { useEffect, useRef, useState } from 'react';
import { ThreeDots, Trash } from 'react-bootstrap-icons';

const AlbumDetail = ({ setComponentToRender }) => {
  const fakeData = [
    'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  ];
  const { isShowing: openUploadImage, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);

  const fileInputRef = useRef(null);
  const clickOutsideRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleConfirmUpload = () => {
    toggleUploadImage();
  };

  const modalContent = () => {
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
          onChange={(event)=>handleFileChange(event, setPreviewImage, setSelectedFile)}
        />
        <img src={previewImage} alt="" id="image-to-album" />
      </div>
    );
  };

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

  return (
    <div className="Album-detail-container">
      <div>
        <button id="back-to-portfolio" onClick={() => setComponentToRender(0)}>
          Back
        </button>
      </div>
      <div className="album-detail-header">
        <span id="album-detail-title">Album tittle</span>
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
        modalTitle={'Upload image to album'}
        modalContent={modalContent()}
        handleClose={() => [toggleUploadImage(), setPreviewImage(null)]}
        handleSavechanges={handleConfirmUpload}
      />
    </div>
  );
};

export default AlbumDetail;
