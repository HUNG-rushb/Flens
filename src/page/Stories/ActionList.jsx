import { useAuthState } from '../../context/AuthContext';
import { useChangeVisiblePost, useDeletePost } from '../../graphql/usePost';
import { successfullNoty } from '../../utils/useNotify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlagFill,
  Trash3Fill,
  ThreeDots,
  EyeFill,
  PencilSquare,
} from 'react-bootstrap-icons';
import Modal from '../../components/Modal/Modal';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';

const MoreActionList = ({
  item,
  showReport,
  toggleShowReport,
  setImageToReport,
  setIsDeletedPost,
  setPostVisibility,
  postVisibility,
}) => {
  const { id: userId } = useAuthState();

  const clickOutsideRef = useRef(null);
  const [showListActions, setShowListActions] = useState(true);
  const { isShowing: showModal, toggle: toggleShow } = useModal();
  const [currentPostVisibility, setCurrentPostVisibility] =
    useState(postVisibility);
  const visibilityValue = useMemo(
    () => ['PUBLIC', 'PRIVATE', 'ONLY_FOLLOWERS'],
    []
  );
  const { deletePost, isFetching: deleteLoading } = useDeletePost();
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
        successfullNoty('Delete post successfull !!!');
      } catch (e) {
        throw e;
      }
    },
    [deletePost, item?.id, setIsDeletedPost]
  );

  const handleReportImage = useCallback(() => {
    setShowListActions(true);
    setImageToReport((prev) => ({
      ...prev,
      image: item?.image?.url,
      postId: item?.id,
      userId: item?.userId?.id,
    }));
    toggleShowReport(showReport);
  }, [item, setImageToReport, showReport, toggleShowReport]);

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
        successfullNoty('Change post visibility successfull !!!');
        setPostVisibility(currentPostVisibility);
      } catch (e) {
        throw e;
      }

      toggleShow();
    },
    [toggleShow, updatePost, item?.id, currentPostVisibility, setPostVisibility]
  );

  const handleEditImage = () => {
    // handle edit image
  }

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
              {item?.userId?.id !== userId && (
                <li onClick={handleReportImage}>
                  <FlagFill color="blue" />
                  Report post
                </li>
              )}
              {item?.userId?.id === userId && (
                <li onClick={handleEditImage}>
                  <PencilSquare color="green" />
                  Edit post
                </li>
              )}
              {item?.userId?.id === userId && (
                <li onClick={handleDeletePost}>
                  <Trash3Fill color="#FF2E2E" />
                  Delete post
                </li>
              )}
              {item?.userId?.id === userId && (
                <li
                  onClick={() => {
                    setShowListActions(true);
                    toggleShow();
                  }}
                >
                  <EyeFill color="#097969" />
                  Change visibility
                </li>
              )}
            </ul>
          </div>
        </div>
        <Loading loading={deleteLoading} />
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
      deleteLoading,
      handleChangeMode,
      handleDeletePost,
      handleReportImage,
      item?.userId?.id,
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
