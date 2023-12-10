import Modal from '../../../../components/Modal/Modal';
import useModal from '../../../../hooks/useModal.jsx';
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
  const [uploadedImages, setUploadedImages] = useState([
    {
      id: 1,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      isChoose: false,
    },
    {
      id: 2,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      isChoose: false,
    },
    {
      id: 3,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      isChoose: false,
    },
    {
      id: 4,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      isChoose: false,
    },
    {
      id: 5,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      isChoose: false,
    },
  ]);

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

  const { isShowing: showModal, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);
  const clickOutsideRef = useRef(null);

  const handleImageClick = (id) => {
    setUploadedImages((prevImages) =>
      prevImages.map((item) =>
        item.id === id ? { ...item, isChoose: !item.isChoose } : item
      )
    );
  };

  const modalContent = useCallback(() => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          placeItems: 'center',
          gap: '10px',
        }}
      >
        {uploadedImages.map((item) => (
          <div
            key={item.id}
            className={item.isChoose ? 'choose-image' : 'not-choose-image'}
          >
            <img
              src={item.image}
              alt=""
              style={{
                maxWidth: '250px',
                width: '100%',
              }}
              onClick={() => handleImageClick(item.id)}
            />
          </div>
        ))}
      </div>
    );
  }, [uploadedImages]);

  const handleConfirmUpload = useCallback(() => {
    const chooseImageList = uploadedImages.filter((item) => item.isChoose);
    console.log(chooseImageList, 'choosen list');
    toggleUploadImage();
  }, [toggleUploadImage, uploadedImages]);

  const handleClose = useCallback(() => {
    toggleUploadImage();
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
          show={showModal}
          modalTitle="Upload image to album"
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleConfirmUpload}
          size="lg"
        />
      </div>
    ),
    [
      detailAlbum?.name,
      fakeData,
      handleClose,
      handleConfirmUpload,
      modalContent,
      setComponentToRender,
      showListOtherActions,
      showModal,
      toggleUploadImage,
    ]
  );
};

export default AlbumDetail;
