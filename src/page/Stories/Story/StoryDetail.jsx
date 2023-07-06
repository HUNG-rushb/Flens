import Spinner from '../../../components/utils/Spinner.js';
import { useGetStoryInfo } from '../../../graphql/useStory.js';
import unixToDateTime from '../../../utils/unixToDateTime.js';
import StoryComment from '../../Home/Post/StoryComment.jsx';
import './StoryDetail.css';
import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  HeartFill,
  Reply,
  ThreeDots,
  Flag,
  Trash,
} from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { storyId } = useParams();
  const { isFetching, fetchedData, fetchError, refetch } = useGetStoryInfo({
    storyInfoData: { storyId },
  });

  // console.log({ fetchedData });

  const clickOutsideRef = useRef(null);

  const [isLiked, setIsLiked] = useState(false);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleClickReportStory = () => {
    setShowListOtherActions(true);
  };

  const handleClickDeleteStory = () => {
    setShowListOtherActions(true);
  };

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

  if (fetchError) {
    return <p>Error</p>;
  } else if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="story-detail-container">
      <div className="story-detail-content">
        <div className="story-detail-userInfor">
          <img src={fetchedData?.storyInfo.userId.backgroundImageURL} />
          <div>
            <span id="story-detail-username">
              {fetchedData?.storyInfo.userId.name}
            </span>
            <span>{unixToDateTime(fetchedData?.storyInfo.createdAt)}</span>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: fetchedData?.storyInfo.content }}
        />
        <div className="story-detail-interaction" ref={clickOutsideRef}>
          <div>
            {!isLiked ? (
              <Heart size={28} onClick={handleClickLike} />
            ) : (
              <HeartFill size={28} color="red" onClick={handleClickLike} />
            )}
            <span>{fetchedData?.storyInfo.points}</span>
          </div>
          <ThreeDots
            size={28}
            onClick={() => setShowListOtherActions((prev) => !prev)}
          />

          <div
            className="list-other-actions-story"
            hidden={showListOtherActions}
          >
            <ul>
              <li onClick={handleClickReportStory}>
                <Flag color="blue" />
                Report this story
              </li>
              <li onClick={handleClickDeleteStory}>
                <Trash color="red" />
                Delete story
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <StoryComment item={fetchedData?.storyInfo} refetchStory={refetch} />
      </div>
    </div>
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
