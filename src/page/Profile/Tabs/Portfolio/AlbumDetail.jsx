import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext.js';
import { useGetAlbumInfo } from '../../../../graphql/useAlbum';
import { useGetNotInAlbumInfo } from '../../../../graphql/useAlbum';
import { useAddPhotoAlbum } from '../../../../graphql/useAlbum';
import useModal from '../../../../hooks/useModal.jsx';
import ErrorPopup from '../../../../utils/errorPopup.js';
import Loading from '../../../../utils/useLoading.js';
import './Portfolio.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThreeDots, Trash } from 'react-bootstrap-icons';
import Masonry from 'react-layout-masonry';
import { useParams } from 'react-router-dom';

const AlbumDetail = ({ setComponentToRender, detailAlbum }) => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();
  const { addNewPhotoToAlbum } = useAddPhotoAlbum();
  const {
    fetchedData: photos,
    isFetching: loadAlbumPhotos,
    fetchError: fetchAlbumError,
    refetch,
  } = useGetAlbumInfo({
    data: { userId, currentUserId, albumId: detailAlbum.id },
  });
  // console.log({ photos });
  const { fetchedData: notInAlbumPhotos } = useGetNotInAlbumInfo({
    data: { userId, albumId: detailAlbum.id },
  });

  const { isShowing: showModal, toggle: toggleUploadImage } = useModal();
  const [showListOtherActions, setShowListOtherActions] = useState(false);
  const clickOutsideRef = useRef(null);
  const [choosenImages, setChoosenImages] = useState([]);

  const handleImageClick = useCallback(
    (item) => {
      const isImageChoosen = choosenImages.some(
        (checkItem) => checkItem.id === item.id
      );
      if (isImageChoosen) {
        setChoosenImages((prev) =>
          prev.filter((prevItem) => prevItem.id !== item.id)
        );
      } else {
        setChoosenImages((prev) => [...prev, item]);
      }
    },
    [choosenImages]
  );

  const modalContent = useCallback(() => {
    return (
      <Masonry
        columns={3}
        gap={10}
        style={{ height: '400px', overflowY: 'scroll', overflowX: 'hidden' }}
      >
        {notInAlbumPhotos?.postNotInAlbum.map((item) => (
          <div
            key={item?.id}
            className={
              choosenImages.some((checkItem) => checkItem.id === item.id)
                ? 'choose-image'
                : 'not-choose-image'
            }
          >
            <img
              src={item?.image.url}
              alt=""
              style={{
                maxWidth: '250px',
                width: '100%',
              }}
              onClick={() => handleImageClick(item)}
            />
          </div>
        ))}
      </Masonry>
    );
  }, [choosenImages, handleImageClick, notInAlbumPhotos?.postNotInAlbum]);

  const handleAddImage = useCallback(() => {
    toggleUploadImage();
    setChoosenImages([]);
  }, [toggleUploadImage]);

  const handleClose = useCallback(() => {
    toggleUploadImage();
    setChoosenImages([]);
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
      <>
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
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {detailAlbum?.name}
            </span>
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
                <div key={item.id}>
                  <img
                    src={item?.image.url}
                    width={270}
                    height={270}
                    style={{
                      maxWidth: '270px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                    alt=""
                  />
                </div>
              ))}
          </div>
          <Modal
            show={showModal}
            modalTitle="Add photos to album"
            modalContent={modalContent()}
            handleClose={handleClose}
            handleSavechanges={handleAddImage}
            size="lg"
            submitText="Add photos"
          />
        </div>
        <Loading loading={loadAlbumPhotos} />
        {fetchAlbumError?.message && (
          <ErrorPopup message={fetchAlbumError?.message} />
        )}
      </>
    ),
    [
      detailAlbum?.name,
      showListOtherActions,
      toggleUploadImage,
      photos,
      showModal,
      modalContent,
      handleClose,
      handleAddImage,
      loadAlbumPhotos,
      fetchAlbumError?.message,
      setComponentToRender,
    ]
  );
};

export default AlbumDetail;
