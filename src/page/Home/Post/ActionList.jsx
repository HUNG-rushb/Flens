import Modal from '../../../components/Modal/Modal';
import { useAuthState } from '../../../context/AuthContext';
import { useChangeVisiblePost, useDeletePost } from '../../../graphql/usePost';
import useModal from '../../../hooks/useModal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Flag, Trash, ThreeDots, GearFill } from 'react-bootstrap-icons';

const MoreActionList = ({
  item,
  showReport,
  toggleShowReport,
  setImageToReport,
  setIsDeletedPost,
  setPostVisibility,
  postVisibility,
}) => {
  const clickOutsideRef = useRef(null);
  const { id: userId } = useAuthState();
  const [showListActions, setShowListActions] = useState(true);
  const { isShowing: showModal, toggle: toggleShow } = useModal();
  const [currentPostVisibility, setCurrentPostVisibility] =
    useState(postVisibility);
  const visibilityValue = useMemo(
    () => ['PUBLIC', 'PRIVATE', 'ONLY_FOLLOWERS'],
    []
  );
  const { deletePost } = useDeletePost();

  const handleReportImage = useCallback(() => {
    setShowListActions(true);
    setImageToReport(item?.image.url);
    toggleShowReport(showReport);
  }, [item?.image.url, setImageToReport, showReport, toggleShowReport]);

  const { updatePost } = useChangeVisiblePost(
    setCurrentPostVisibility,
    setPostVisibility
  );

  const handleDeletePost = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await deletePost({
          variables: {
            deletePostData: {
              postId: item?.id,
            },
          },
        });

        setIsDeletedPost(true);
      } catch (e) {
        throw e;
      }
    },
    [deletePost, item?.id, setIsDeletedPost]
  );

  const modalContent = useCallback(() => {
    return (
      <div className="change-post-mode-wrapper">
        {visibilityValue.map((item, index) => (
          <label id="change-mode-label" key={item + index}>
            {item}
            <div id="mode-radio">
              <input
                type="radio"
                name="post-mode"
                value={item}
                checked={currentPostVisibility === item}
                onChange={() => {
                  setCurrentPostVisibility(item);
                }}
              />
            </div>
          </label>
        ))}
      </div>
    );
  }, [visibilityValue, currentPostVisibility, setCurrentPostVisibility]);

  const handleChangeMode = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await updatePost({
          variables: {
            changeVisiblePostData: {
              postId: item?.id,
              postViewStatus: currentPostVisibility,
            },
          },
        });

        setPostVisibility(currentPostVisibility);
      } catch (e) {
        throw e;
      }

      toggleShow();
    },
    [toggleShow, updatePost, item?.id, currentPostVisibility, setPostVisibility]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListActions(true);
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
        <div className="more-action-wrapper" ref={clickOutsideRef}>
          <ThreeDots
            size={25}
            onClick={() => setShowListActions((prev) => !prev)}
            id="more-action-icon"
          />
          <div className="list-actions" hidden={showListActions}>
            <ul>
              <li onClick={handleReportImage}>
                <Flag color="blue" />
                Report
              </li>

              {item?.userId.id === userId && (
                <li onClick={handleDeletePost}>
                  <Trash color="red" />
                  Delete this photo
                </li>
              )}

              {item?.userId.id === userId && (
                <li
                  onClick={() => {
                    setShowListActions(true);
                    toggleShow();
                  }}
                >
                  <GearFill color="black" />
                  Setting mode
                </li>
              )}
            </ul>
          </div>
        </div>
        <Modal
          show={showModal}
          modalTitle="Change your post visibility"
          modalContent={modalContent()}
          handleClose={() => {
            setCurrentPostVisibility(postVisibility);
            toggleShow();
          }}
          handleSavechanges={handleChangeMode}
        />
      </>
    ),
    [
      handleChangeMode,
      handleDeletePost,
      handleReportImage,
      item?.userId.id,
      modalContent,
      postVisibility,
      showListActions,
      showModal,
      toggleShow,
      userId,
    ]
  );
};

export default MoreActionList;
