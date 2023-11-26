import Modal from '../../components/Modal/Modal';
import { useAuthState } from '../../context/AuthContext';
import { useChangeVisiblePost, useDeletePost } from '../../graphql/usePost';
import { useCreateReport, useUpdateReportPost } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import { ReportContent } from '../../page/ReportManagement/ReportImageContent';
import Loading from '../../utils/useLoading';
import { successfullNoty } from '../../utils/useNotify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlagFill,
  Trash3Fill,
  ThreeDots,
  EyeFill,
  PencilSquare,
} from 'react-bootstrap-icons';

const MoreActionList = ({
  item,
  setIsDeletedPost,
  setPostVisibility,
  postVisibility,
  reportedPosts,
  setReportedPosts,
}) => {
  const { id: userId } = useAuthState();
  const clickOutsideRef = useRef(null);
  const [action, setAction] = useState('');
  const [showListActions, setShowListActions] = useState(true);
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();
  const [imageToReport, setImageToReport] = useState({
    image: '',
    postId: '',
    userId: '',
    reason: 'Copyright infringement',
  });
  const { createReport } = useCreateReport();
  const { reportedPost } = useUpdateReportPost();

  const [currentPostVisibility, setCurrentPostVisibility] =
    useState(postVisibility);
  const visibilityValue = useMemo(
    () => ['PUBLIC', 'PRIVATE', 'ONLY_FOLLOWERS'],
    []
  );
  const { deletePost, isFetching } = useDeletePost();
  const { updatePost } = useChangeVisiblePost(
    setCurrentPostVisibility,
    setPostVisibility
  );

  const handleReportClick = useCallback(() => {
    setShowListActions(true);
    setAction('REPORT');
    setImageToReport((prev) => ({
      ...prev,
      image: item?.image.url,
      postId: item?.id,
      userId: item?.userId.id,
    }));
    toggleShowModal();
  }, [item, setImageToReport, toggleShowModal]);

  const handleReport = useCallback(async () => {
    try {
      await createReport({
        variables: {
          createReportData: {
            postId: imageToReport.postId,
            userId: imageToReport.userId,
            reason: imageToReport.reason,
            userReported: userId,
          },
        },
      });

      await reportedPost({
        variables: {
          data: {
            postId: imageToReport.postId,
            userId,
          },
        },
      });

      setReportedPosts([...reportedPosts, imageToReport.postId]);

      toggleShowModal();
    } catch (e) {}
  }, [
    createReport,
    imageToReport.postId,
    imageToReport.reason,
    imageToReport.userId,
    reportedPost,
    reportedPosts,
    setReportedPosts,
    toggleShowModal,
    userId,
  ]);

  const handleDeleteClick = useCallback(() => {
    setShowListActions(true);
    setAction('DELETE');
    toggleShowModal();
  }, [toggleShowModal]);

  const handleEditImage = () => {
    setAction('EDIT');
  };

  const handleDeletePost = useCallback(async () => {
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
  }, [deletePost, item?.id, setIsDeletedPost]);

  const handleChangeVisibilityClick = useCallback(() => {
    setAction('CHANGE_MODE');
    setShowListActions(true);
    toggleShowModal();
  }, [toggleShowModal]);

  const handleChangeMode = useCallback(async () => {
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
    toggleShowModal();
  }, [
    toggleShowModal,
    updatePost,
    item?.id,
    currentPostVisibility,
    setPostVisibility,
  ]);

  const modalTitle = useMemo(() => {
    if (action === 'REPORT') {
      return 'Report Post/Story';
    } else if (action === 'DELETE') {
      return 'Delete Post/Story';
    } else if (action === 'CHANGE_MODE') {
      return `Change Post/Story's visibility`;
    } else return '';
  }, [action]);

  const modalContent = useCallback(() => {
    if (action === 'REPORT') {
      return (
        <ReportContent
          image={imageToReport.image}
          setImageToReport={setImageToReport}
        />
      );
    } else if (action === 'DELETE') {
      return 'Are you sure to delete this Post/Story?';
    } else if (action === 'CHANGE_MODE') {
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
    } else return <></>;
  }, [action, imageToReport.image, visibilityValue, currentPostVisibility]);

  const handleSavechanges = useCallback(() => {
    if (action === 'REPORT') {
      handleReport();
    } else if (action === 'DELETE') {
      handleDeletePost();
    } else if (action === 'CHANGE_MODE') {
      handleChangeMode();
    } else {
      toggleShowModal();
    }
  }, [
    action,
    handleChangeMode,
    handleDeletePost,
    handleReport,
    toggleShowModal,
  ]);

  const handleClose = useCallback(() => {
    if (action === 'CHANGE_MODE') {
      setCurrentPostVisibility(postVisibility);
      toggleShowModal();
    } else toggleShowModal();
  }, [action, postVisibility, toggleShowModal]);

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
              {item?.userId.id !== userId && (
                <li onClick={handleReportClick}>
                  <FlagFill color="blue" />
                  Report post
                </li>
              )}
              {item?.userId.id === userId && (
                <li onClick={handleEditImage}>
                  <PencilSquare color="green" />
                  Edit post
                </li>
              )}
              {item?.userId.id === userId && (
                <li onClick={handleDeleteClick}>
                  <Trash3Fill color="#FF2E2E" />
                  Delete post
                </li>
              )}
              {item?.userId.id === userId && (
                <li onClick={handleChangeVisibilityClick}>
                  <EyeFill color="#097969" />
                  Change visibility
                </li>
              )}
            </ul>
          </div>
        </div>
        <Loading loading={isFetching} />
        <Modal
          show={showModal}
          modalTitle={modalTitle}
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleSavechanges}
        />
      </>
    ),
    [
      showListActions,
      item?.userId.id,
      userId,
      handleReportClick,
      handleDeleteClick,
      handleChangeVisibilityClick,
      isFetching,
      showModal,
      modalTitle,
      modalContent,
      handleClose,
      handleSavechanges,
    ]
  );
};

export default MoreActionList;
