import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import { useCreateAlbumLazy } from '../../../../graphql/useAlbum';
import { useGetAllUserAlbum } from '../../../../graphql/useAlbum';
import useModal from '../../../../hooks/useModal';
import ErrorPopup from '../../../../utils/errorPopup';
import Loading from '../../../../utils/useLoading';
import { successfullNoty } from '../../../../utils/useNotify';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const AlbumImage = ({ setComponentToRender, setDetailAlbum }) => {
  const { userId: visitedUserId } = useParams();
  console.log({ visitedUserId });
  const { id: userId } = useAuthState();
  const navigate = useNavigate();
  const {
    fetchedData: userAlbums,
    isFetching,
    refetch,
    fetchError,
  } = useGetAllUserAlbum({
    userAllAlbumData: { userId: visitedUserId },
  });

  const { isShowing: openCreateAlbum, toggle: toggleCreateAlbum } = useModal();
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  const { createAlbum } = useCreateAlbumLazy();

  const handleCreateAlbum = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await createAlbum({
          variables: {
            createAlbumData: {
              userId,
              name: newAlbumTitle,
            },
          },
        });

        toggleCreateAlbum();
      } catch (e) {
        throw e;
      }
      setNewAlbumTitle('');
      successfullNoty('Create album successfull !!!');
      refetch();
    },
    [createAlbum, newAlbumTitle, refetch, toggleCreateAlbum, userId]
  );

  const modalContent = useCallback(() => {
    return (
      <div className="up-new-album">
        <div className="album-new-title">
          <label htmlFor="">Album title</label>
          <input
            type="text"
            required
            placeholder="Enter album title"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
        </div>
      </div>
    );
  }, [newAlbumTitle]);

  const handleClose = useCallback(() => {
    toggleCreateAlbum();
  }, [toggleCreateAlbum]);

  const handleViewDetail = useCallback(
    (album) => {
      navigate(`/profile/${userId}`, {
        state: {
          posts: album?.posts,
        },
      });
      setComponentToRender(1);
      setDetailAlbum(album);
    },
    [navigate, setComponentToRender, setDetailAlbum, userId]
  );

  return useMemo(
    () => (
      <div className="album">
        <div className="album-title">
          <span
            style={{ fontSize: '20px', fontWeight: 600, paddingLeft: '5px' }}
          >
            Album ({userAlbums ? userAlbums.userAllAlbum.length : 0})
          </span>
        </div>

        {userAlbums && (
          <div className="album-images">
            {visitedUserId === userId && (
              <div>
                <div className="new-album" onClick={toggleCreateAlbum}>
                  +
                </div>
                <span id="child-album-title">Create album</span>
              </div>
            )}

            {userAlbums.userAllAlbum.map((album) => (
              <div
                key={album.id}
                className="child-album"
                onClick={() => handleViewDetail(album)}
              >
                {album?.posts[0] ? (
                  <img
                    src={album?.posts[0]?.image.url}
                    width={210}
                    height={210}
                    style={{
                      maxWidth: '210px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                    }}
                    alt=""
                  />
                ) : (
                  <div className="child-album-background">No image</div>
                )}
                <span id="child-album-title">{album.name}</span>
              </div>
            ))}
          </div>
        )}

        <Loading loading={isFetching} />

        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}

        <Modal
          show={openCreateAlbum}
          modalTitle="Create new album"
          submitText="Create"
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleCreateAlbum}
        />
      </div>
    ),
    [
      fetchError?.message,
      handleClose,
      handleCreateAlbum,
      handleViewDetail,
      isFetching,
      modalContent,
      openCreateAlbum,
      toggleCreateAlbum,
      userAlbums,
      userId,
      visitedUserId,
    ]
  );
};

export default AlbumImage;
