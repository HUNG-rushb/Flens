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

const AlbumImage = ({ setComponentToRender, setDetailAlbum }) => {
  const { userId: visitedUserId } = useParams();
  console.log({ visitedUserId });
  const { id: userId } = useAuthState();
  const {
    fetchedData: userAlbums,
    isFetching,
    refetch,
    fetchError,
  } = useGetAllUserAlbum({
    userAllAlbumData: { userId: visitedUserId },
  });

  console.log(userAlbums, 'user album');

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

  return useMemo(
    () => (
      <div className="album">
        <div className="album-title">
          <span>Album ({userAlbums ? userAlbums.userAllAlbum.length : 0})</span>
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
                onClick={() => [setComponentToRender(1), setDetailAlbum(album)]}
              >
                {album.posts.length > 0 ? (
                  <img src={album.posts[0].image.url} alt="" />
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
      isFetching,
      modalContent,
      openCreateAlbum,
      setComponentToRender,
      setDetailAlbum,
      toggleCreateAlbum,
      userAlbums,
    ]
  );
};

export default AlbumImage;
