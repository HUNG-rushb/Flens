import Modal from '../../components/Modal/Modal';
import { useAuthState } from '../../context/AuthContext';
import { useChangeVisiblePost, useDeletePost } from '../../graphql/usePost';
import { useCreateReport, useUpdateReportPost } from '../../graphql/useReport';
import { useDeleteStory } from '../../graphql/useStory';
import useModal from '../../hooks/useModal';
import { ReportContent } from '../../page/ReportManagement/ReportImageContent';
import EditPost from '../../page/UploadImage/EditPost';
import ErrorPopup from '../../utils/errorPopup';
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
import { useNavigate, useParams } from 'react-router-dom';

const MoreActionList = ({
  type,
  item,
  setIsDeleted,
  setPostVisibility,
  postVisibility,
  setReportedList,
  showDetail,
}) => {
  const { id: userId } = useAuthState();
  const { storyId } = useParams();
  const clickOutsideRef = useRef(null);
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [showListActions, setShowListActions] = useState(true);
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();
  const [imageToReport, setImageToReport] = useState({
    image: '',
    postId: '',
    userId: '',
    reason: 'Copyright infringement',
  });
  const { isShowing: showEditPost, toggle: toggleEditPost } = useModal();

  const {
    createReport,
    isFetching: fetchinggReport,
    fetchError: fetchReportError,
  } = useCreateReport();
  const { reportedPost } = useUpdateReportPost();

  const [currentPostVisibility, setCurrentPostVisibility] =
    useState(postVisibility);
  const visibilityValue = useMemo(
    () => ['PUBLIC', 'PRIVATE', 'ONLY_FOLLOWERS'],
    []
  );
  const { deletePost, isFetching } = useDeletePost();
  const { deleteStory } = useDeleteStory();
  const { updatePost } = useChangeVisiblePost(
    setCurrentPostVisibility,
    setPostVisibility
  );

  const handleReportClick = useCallback(() => {
    setShowListActions(true);
    setAction('REPORT');
    setImageToReport((prev) => ({
      ...prev,
      image: type === 'post' ? item?.image?.url : item?.images[0],
      postId: item?.id,
      userId: item?.userId.id,
    }));
    toggleShowModal();
  }, [
    item?.id,
    item?.image?.url,
    item?.images,
    item?.userId.id,
    toggleShowModal,
    type,
  ]);

  const handleReportPost = useCallback(async () => {
    try {
      await createReport({
        variables: {
          createReportData: {
            postId: imageToReport?.postId,
            userId: imageToReport?.userId,
            reason: imageToReport?.reason,
            userReported: userId,
          },
        },
      });

      await reportedPost({
        variables: {
          data: {
            postId: imageToReport?.postId,
            userId,
          },
        },
      });
      setReportedList((prev) => [...prev, imageToReport?.postId]);
      toggleShowModal();
    } catch (e) {}
  }, [
    createReport,
    imageToReport?.postId,
    imageToReport?.reason,
    imageToReport?.userId,
    reportedPost,
    setReportedList,
    toggleShowModal,
    userId,
  ]);

  const handleReportStory = () => {
    /// handle report story
  };

  const handleDeleteClick = useCallback(() => {
    setShowListActions(true);
    setAction('DELETE');
    toggleShowModal();
  }, [toggleShowModal]);

  const handleEditClick = useCallback(() => {
    setAction('EDIT');
    if (type === 'post') {
      toggleEditPost();
    } else {
      navigate('/edit-story', { state: { story: item } });
    }
  }, [item, navigate, toggleEditPost, type]);

  const handleDeletePost = useCallback(async () => {
    try {
      await deletePost({
        variables: {
          deletePostData: {
            postId: item?.id,
          },
        },
      });
      setIsDeleted(true);
      successfullNoty('Delete post successfull !!!');
    } catch (e) {
      throw e;
    }
  }, [deletePost, item?.id, setIsDeleted]);

  const handleDeleteStory = useCallback(async () => {
    try {
      await deleteStory({
        variables: {
          deleteStoryData: {
            storyId,
          },
        },
      });

      navigate('/explore/stories');
    } catch (e) {
      throw e;
    }
  }, [deleteStory, navigate, storyId]);

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
      return type === 'post' ? 'Report this Post' : 'Report this Story';
    } else if (action === 'DELETE') {
      return type === 'post' ? 'Delete Post' : 'Delete Story';
    } else if (action === 'CHANGE_MODE') {
      return type === 'post'
        ? `Change Post's visibility`
        : `Change Story's visibility`;
    } else return '';
  }, [action, type]);

  const modalContent = useCallback(() => {
    if (action === 'REPORT') {
      return (
        <ReportContent
          image={imageToReport?.image}
          setImageToReport={setImageToReport}
        />
      );
    } else if (action === 'DELETE') {
      return type === 'post'
        ? 'Are you sure to delete this Post?'
        : 'Are you sure to delete this Story?';
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
  }, [
    action,
    imageToReport?.image,
    type,
    visibilityValue,
    currentPostVisibility,
  ]);

  const handleSavechanges = useCallback(() => {
    if (action === 'REPORT') {
      type === 'post' ? handleReportPost() : handleReportStory();
    } else if (action === 'DELETE') {
      type === 'post' ? handleDeletePost() : handleDeleteStory();
    } else if (action === 'CHANGE_MODE') {
      handleChangeMode();
    } else {
      toggleShowModal();
    }
  }, [
    type,
    action,
    handleChangeMode,
    handleDeletePost,
    handleDeleteStory,
    handleReportPost,
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
          <div
            className="list-actions"
            hidden={showListActions}
            style={showDetail ? { top: '45px', right: '5px' } : {}}
          >
            <ul>
              {item?.userId.id !== userId && (
                <li onClick={handleReportClick}>
                  <FlagFill color="blue" />
                  Report {type}
                </li>
              )}
              {item?.userId.id === userId && (
                <li onClick={handleEditClick}>
                  <PencilSquare color="green" />
                  Edit {type}
                </li>
              )}
              {item?.userId.id === userId && (
                <li onClick={handleDeleteClick}>
                  <Trash3Fill color="#FF2E2E" />
                  Delete {type}
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
        <Loading loading={isFetching || fetchinggReport} />
        {fetchReportError?.message && (
          <ErrorPopup message={fetchReportError?.message} />
        )}
        <Modal
          show={showModal}
          modalTitle={modalTitle}
          modalContent={modalContent()}
          handleClose={handleClose}
          handleSavechanges={handleSavechanges}
          submitText={action === 'DELETE' ? 'Delete' : 'Submit'}
        />
        <EditPost
          showModal={showEditPost}
          post={item}
          toggleShow={toggleEditPost}
        />
      </>
    ),
    [
      showListActions,
      showDetail,
      item,
      userId,
      handleReportClick,
      type,
      handleEditClick,
      handleDeleteClick,
      handleChangeVisibilityClick,
      isFetching,
      fetchinggReport,
      fetchReportError?.message,
      showModal,
      modalTitle,
      modalContent,
      handleClose,
      handleSavechanges,
      action,
      showEditPost,
      toggleEditPost,
    ]
  );
};

export default MoreActionList;
