import { useAuthState } from '../../../context/AuthContext';
import {
  useGetStoryInfo,
  useDeleteStory,
  useInteractStory,
} from '../../../graphql/useStory';
import unixToDateTime from '../../../utils/unixToDateTime';
import Loading from '../../../utils/useLoading';
import StoryComment from '../../Home/Post/StoryComment';
import './styles.scss';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  Heart,
  HeartFill,
  ThreeDots,
  Flag,
  Trash,
  Reply,
} from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';

const StoryDetail = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { id: userId } = useAuthState();

  const clickOutsideRef = useRef(null);

  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(0);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const { isFetching, fetchedData, fetchError, refetch } = useGetStoryInfo(
    {
      storyInfoData: { storyId },
    },
    userId,
    setIsLiked,
    setCountNumberOfLikes
  );

  console.log({ fetchedData }, 'story detail');

  const { deleteStory } = useDeleteStory();
  const { interactStory } = useInteractStory();

  const handleLikeStory = useCallback(
    async (event) => {
      event.preventDefault();
      setAnimationWhenClick(true);
      try {
        const a = await interactStory({
          variables: {
            interactStoryData: {
              storyId,
              likedUserId: userId,
              isLiked: !isLiked,
            },
          },
        });
        setIsLiked(!isLiked);
        setCountNumberOfLikes(a.data.interactStory.points);
      } catch (e) {
        throw e;
      }
    },
    [interactStory, isLiked, storyId, userId]
  );

  // !!!!!!!!!
  const handleReportStory = () => {
    setShowListOtherActions(true);
  };

  const handleDeleteStory = useCallback(
    async (event) => {
      event.preventDefault();

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
    },
    [deleteStory, navigate, storyId]
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
  }, [animationWhenClick, handleLikeStory, isLiked]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowListOtherActions(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (animationWhenClick) {
      setTimeout(() => {
        setAnimationWhenClick(false);
      }, 1000);
    }
  }, [animationWhenClick]);

  return useMemo(
    () => (
      <>
        <div className="story-detail">
          <div className="content">
            <div className="user-infor">
              <div className="user-infor-wrapper">
                <img
                  id="user-avatar"
                  src={fetchedData?.storyInfo.userId.backgroundImageURL}
                  width={60}
                  height={60}
                  alt=""
                />
                <div className="sub-user-infor">
                  <span id="username">
                    {fetchedData?.storyInfo.userId.name}
                  </span>
                  <span>
                    {unixToDateTime(fetchedData?.storyInfo?.createdAt || '')}
                  </span>
                </div>
              </div>
              <ThreeDots
                size={28}
                onClick={() => setShowListOtherActions((prev) => !prev)}
              />
              <div className="list-other-actions" hidden={showListOtherActions}>
                <ul>
                  <li onClick={handleReportStory}>
                    <Flag color="blue" />
                    Report this story
                  </li>
                  <li onClick={handleDeleteStory}>
                    <Trash color="red" />
                    Delete story
                  </li>
                </ul>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: fetchedData?.storyInfo.content,
              }}
              className="story-main-image"
            />

            <div className="interaction" ref={clickOutsideRef}>
              <div className="likes">
                {renderHeartIcon()}
                <span id="total-likes">{countNumberOfLikes}</span>
              </div>
              <Reply size={28} />
            </div>
            <hr />
            <StoryComment
              item={fetchedData?.storyInfo}
              refetchStory={refetch}
            />
          </div>
        </div>
        <Loading loading={isFetching} />
      </>
    ),
    [
      countNumberOfLikes,
      fetchedData?.storyInfo,
      handleDeleteStory,
      isFetching,
      refetch,
      renderHeartIcon,
      showListOtherActions,
    ]
  );
};

export default StoryDetail;
// {
//   "fetchedData": {
//     "storyInfo": {
//       "comments": [],
//       "content": "<p>Hello </p><p><br></p><p><br></p><p><br></p><p><img src=\"https://bku-image-story.s3.ap-southeast-1.amazonaws.com/11-tests-342254.jpg\"></p><p><br></p><p><br></p><p><br></p><p><img src=\"https://bku-image-story.s3.ap-southeast-1.amazonaws.com/42_IndexError-184664.jpg\"></p>",
//       "createdAt": "1688236819467",
//       "images": [
//         "https://bku-image-story.s3.ap-southeast-1.amazonaws.com/11-tests-342254.jpg",
//         "https://bku-image-story.s3.ap-southeast-1.amazonaws.com/42_IndexError-184664.jpg"
//       ],
//       "points": 0,
//       "title": "test",
//       "userId": {
//         "backgroundImageURL": "https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/nikon-e950-321773.jpg",
//         "name": "hung",
//         "__typename": "User"
//       },
//       "__typename": "Story"
//     }
//   }
// }
