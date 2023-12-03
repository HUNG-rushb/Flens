import HeaderStory from '../../../components/Header/Header';
import { useAuthState } from '../../../context/AuthContext';
import { useGetStoryInfo } from '../../../graphql/useStory';
import ErrorPopup from '../../../utils/errorPopup';
import Loading from '../../../utils/useLoading';
import StoryComment from '../../Home/Post/StoryComment';
import StoryInteraction from './StoryInteraction';
import './styles.scss';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const StoryDetail = () => {
  const { storyId } = useParams();
  const { id: userId } = useAuthState();
  const [isLiked, setIsLiked] = useState(false);
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(0);

  const { isFetching, fetchedData, fetchError, refetch } = useGetStoryInfo(
    {
      storyInfoData: { storyId },
    },
    userId,
    setIsLiked,
    setCountNumberOfLikes
  );
  
  // console.log({ fetchedData }, 'story detail');

  return useMemo(
    () => ( 
      <>
        <div className="story-detail">
          <div className="content">
            <HeaderStory type="story" item={fetchedData?.storyInfo} />
            <div
              className="story-main-image"
              dangerouslySetInnerHTML={{
                __html: fetchedData?.storyInfo.content,
              }}
            />
            <StoryInteraction
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              countNumberOfLikes={countNumberOfLikes}
              setCountNumberOfLikes={setCountNumberOfLikes}
            />
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
      isLiked,
      refetch,
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
