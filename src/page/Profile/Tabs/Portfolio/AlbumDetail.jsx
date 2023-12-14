import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
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
import { useLocation, useParams } from 'react-router-dom';

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

  const userId = useParams();
  const { id: currentUserId } = useAuthState();
  const location = useLocation();
  const albumPost = location?.state?.posts;
  // import { useParams } from 'react-router';

  console.log({ detailAlbum });
  const { fetchedData: photos, refetch } = useGetAlbumInfo({
    data: { userId, currentUserId, albumId: detailAlbum.id },
  });
  console.log({ photos });

  const { isShowing: showModal, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);
  const clickOutsideRef = useRef(null);

  const handleImageClick = (id) => {};

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
        {/* {uploadedImages.map((item) => (
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
        ))} */}
      </div>
    );
  }, []);

  const handleConfirmUpload = useCallback(() => {
    toggleUploadImage();
  }, [toggleUploadImage]);

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

  useEffect(() => {}, []);

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
          {albumPost.map((item, index) => (
            <div className="album-detail-image" key={index}>
              <img src={item?.image.url} alt="" />
            </div>
          ))}
          {photos &&
            photos.albumInfo.map((item) => (
              <div className="album-detail-image" key={item.id}>
                <img src={item.image.url} alt="" />
              </div>
            ))}
        </div>
        <Modal
          show={showModal}
          modalTitle="Add image to album"
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleConfirmUpload}
          size="lg"
        />
      </div>
    ),
    [
      albumPost,
      detailAlbum?.name,
      handleClose,
      handleConfirmUpload,
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
