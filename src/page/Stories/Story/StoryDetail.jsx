import HeaderStory from '../../../components/Header/Header';
import { useAuthState } from '../../../context/AuthContext';
import {
  useGetStoryInfo,
  useInteractStory,
} from '../../../graphql/useStory';
import ErrorPopup from '../../../utils/errorPopup';
import Loading from '../../../utils/useLoading';
import StoryComment from '../../Home/Post/StoryComment';
import './styles.scss';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Heart, HeartFill, Reply } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { storyId } = useParams();
  const { id: userId } = useAuthState();
  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(0);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);

  const { isFetching, fetchedData, fetchError, refetch } = useGetStoryInfo(
    {
      storyInfoData: { storyId },
    },
    userId,
    setIsLiked,
    setCountNumberOfLikes
  );

  console.log({ fetchedData }, 'story detail');
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
            <HeaderStory
              type="story"
              item={fetchedData?.storyInfo}
              // setIsDeletedPost={setIsDeletedPost}
              // reportedPosts={reportedPosts}
              // setReportedPosts={setReportedPosts}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: fetchedData?.storyInfo.content,
              }}
              className="story-main-image"
            />

            <div className="interaction">
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
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </>
    ),
    [
      countNumberOfLikes,
      fetchError?.message,
      fetchedData?.storyInfo,
      isFetching,
      refetch,
      renderHeartIcon,
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
