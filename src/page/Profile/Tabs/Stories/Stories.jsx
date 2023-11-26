import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import { useCreateReport } from '../../../../graphql/useReport';
import { useGetAllUserStory } from '../../../../graphql/useStory';
import useModal from '../../../../hooks/useModal';
import unixToDateTime from '../../../../utils/unixToDateTime';
import Loading from '../../../../utils/useLoading';
import { successfullNoty } from '../../../../utils/useNotify';
import { ReportContent } from '../../../ReportManagement/ReportImageContent';
import MoreActionList from '../../../Stories/ActionList';
import './styles.scss';
import { useMemo, useState, useEffect } from 'react';
import { useCallback } from 'react';
import { Heart, HeartFill, Reply } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const ProfileStories = () => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();
  const { stories, hasNextPage, isFetching, fetchError, loadNew } =
    useGetAllUserStory(userId, currentUserId);

  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const [imageToReport, setImageToReport] = useState({
    image: '',
    postId: '',
    userId: '',
    reason: 'Copyright infringement',
  });

  const { createReport } = useCreateReport();

  const [isDeletedStory, setIsDeletedStory] = useState(false);

  const reportPost = useCallback(async () => {
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

      // await reportedPost({
      //   variables: {
      //     data: {
      //       postId: imageToReport.postId,
      //       userId,
      //     },
      //   },
      // });

      toggleShowReport();
    } catch (e) {}
  }, [
    createReport,
    imageToReport?.postId,
    imageToReport?.reason,
    imageToReport?.userId,
    toggleShowReport,
    userId,
  ]);

  useEffect(() => {
    if (isDeletedStory) {
      successfullNoty('delete story sucessfull!');
    }
  }, [isDeletedStory]);

  return useMemo(
    () => (
      <div className="profile-stories-container">
        <InfiniteScroll
          dataLength={stories.length}
          next={() => {
            loadNew();
          }}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {stories.map((item) => {
            return (
              <Story
                item={item}
                showReport={showReport}
                setImageToReport={setImageToReport}
                toggleShowReport={toggleShowReport}
                key={item?.node?.id}
                setIsDeletedPost={setIsDeletedStory}
              />
            );
          })}
        </InfiniteScroll>

        <Loading loading={isFetching} />

        <Modal
          show={showReport}
          modalContent={
            <ReportContent
              image={imageToReport.image}
              setImageToReport={setImageToReport}
            />
          }
          handleClose={toggleShowReport}
          handleSavechanges={reportPost}
        />
      </div>
    ),
    [
      hasNextPage,
      imageToReport.image,
      isFetching,
      loadNew,
      reportPost,
      showReport,
      stories,
      toggleShowReport,
    ]
  );
};

export default ProfileStories;

const Story = ({
  item,
  showReport,
  setImageToReport,
  toggleShowReport,
  setIsDeletedPost,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const [postVisibility, setPostVisibility] = useState(item.postViewStatus);

  const handleLikeStory = () => {
    setIsLiked((prev) => !prev);
    setAnimationWhenClick(true);
  };

  const handleViewDetail = useCallback(
    (storyId) => {
      navigate(`/stories/${storyId}`);
    },
    [navigate]
  );

  const renderHeartIcon = useCallback(() => {
    return !isLiked ? (
      <Heart
        size={28}
        onClick={handleLikeStory}
        id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
      />
    ) : (
      <HeartFill
        size={28}
        color="red"
        onClick={handleLikeStory}
        id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
      />
    );
  }, [animationWhenClick, isLiked]);

  useEffect(() => {
    if (animationWhenClick) {
      setTimeout(() => {
        setAnimationWhenClick(false);
      }, 1000);
    }
  }, [animationWhenClick]);

  return useMemo(
    () => (
      <div className="story">
        <div className="header">
          <div className="header-wrapper">
            <img
              height={60}
              width={60}
              id="header-avatar"
              src={item.node.userId.profileImageURL}
              onClick={() => navigate(`/profile/${item.node.userId.id}`)}
              alt=""
            />

            <div
              className="sub-header"
              onClick={() => handleViewDetail(item.node.id)}
            >
              <span id="fullname">{item.node.userId.name}</span>
              <span>{unixToDateTime(item.node.createdAt)}</span>
            </div>
          </div>
          <MoreActionList
            item={item}
            showReport={showReport}
            setImageToReport={setImageToReport}
            toggleShowReport={toggleShowReport}
            setIsDeletedPost={setIsDeletedPost}
            setPostVisibility={setPostVisibility}
            postVisibility={postVisibility}
          />
        </div>
        <div className="description">
          <span id="title" onClick={() => handleViewDetail(item.node.id)}>
            {item.node.title}
          </span>
          <img
            id="image"
            alt=""
            src={item.node.images[0]}
            onClick={() => handleViewDetail(item.node.id)}
          />
          <div className="interaction">
            <div className="like-wrapper">
              {renderHeartIcon()}
              <span id="points">{item.node.points}</span>
            </div>
            <Reply size={28} />
          </div>
        </div>
      </div>
    ),
    [
      handleViewDetail,
      item,
      navigate,
      postVisibility,
      renderHeartIcon,
      setImageToReport,
      setIsDeletedPost,
      showReport,
      toggleShowReport,
    ]
  );
};
