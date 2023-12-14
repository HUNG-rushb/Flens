import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext.js';
import { useGetAlbumInfo } from '../../../../graphql/useAlbum';
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
import { useParams } from 'react-router-dom';

const AlbumDetail = ({ setComponentToRender, detailAlbum }) => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();
  const { fetchedData: photos, refetch } = useGetAlbumInfo({
    data: { userId, currentUserId, albumId: detailAlbum.id },
  });
  const { isShowing: showModal, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);
  const clickOutsideRef = useRef(null);
  
  const [uploadedImages, setUploadedImages] = useState([
    {
      id: 1,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 2,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 3,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 4,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 5,
      image:
        'https://images.pexels.com/photos/17168353/pexels-photo-17168353/free-photo-of-bay-m-c-bu-i-sang-khong-khi.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
  ]);

  const handleImageClick = (id) => {
    setUploadedImages((prevImages) =>
      prevImages.map((item) =>
        item.id === id ? { ...item, isChoose: !item.isChoose } : item
      )
    );
  };

  useEffect(() => {
    const addIsChoose = uploadedImages?.map((item) => {
      return { ...item, isChoose: false };
    });
    setUploadedImages(addIsChoose);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Add images choosen !!!!!!
  const handleAddImage = useCallback(() => {
    const choosenImage = uploadedImages.filter((item) => item.isChoose)
    console.log(choosenImage, 'choosen images')
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
            style={{
              opacity: 1,
              cursor: 'pointer',
              ':hover': {
                opacity: 0.7,
              },
            }}
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
          {photos &&
            photos.albumInfo.map((item) => (
              <div className="album-detail-image" key={item.id}>
                <img src={item?.image.url} alt="" />
              </div>
            ))}
        </div>
        <Modal
          show={showModal}
          modalTitle="Add image to album"
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleAddImage}
          size="lg"
        />
      </div>
    ),
    [
      detailAlbum?.name,
      handleClose,
      handleAddImage,
      modalContent,
      photos,
      setComponentToRender,
      showListOtherActions,
      showModal,
      toggleUploadImage,
    ]
  );
};

export default AlbumDetail;
