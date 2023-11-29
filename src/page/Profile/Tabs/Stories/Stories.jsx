import HeaderStory from '../../../../components/Header/Header';
import { useAuthState } from '../../../../context/AuthContext';
import {
  useGetAllUserStory,
  useGetStoryInfo,
} from '../../../../graphql/useStory';
import ErrorPopup from '../../../../utils/errorPopup';
import Loading from '../../../../utils/useLoading';
import StoryInteraction from '../../../Stories/Story/StoryInteraction';
import './styles.scss';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileStories = () => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();
  const { stories, hasNextPage, isFetching, fetchError, loadNew } =
    useGetAllUserStory(userId, currentUserId);

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
            return <Story item={item} key={item?.node?.id} />;
          })}
        </InfiniteScroll>
        <Loading loading={isFetching} />
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </div>
    ),
    [fetchError?.message, hasNextPage, isFetching, loadNew, stories]
  );
};

export default ProfileStories;

const Story = ({ item }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const storyId = item?.node.id;
  const [isDeletedStory, setIsDeletedStory] = useState(false);
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

  const handleViewDetail = useCallback(
    (storyId) => {
      navigate(`/stories/${storyId}`);
    },
    [navigate]
  );

  return useMemo(
    () => (
      <>
        {isDeletedStory ? (
          <></>
        ) : (
          <div className="story">
            <HeaderStory
              type="story"
              item={item.node}
              setIsDeleted={setIsDeletedStory}
            />
            <div className="description">
              <span id="title" onClick={() => handleViewDetail(item.node.id)}>
                {item.node.title}
              </span>
              <img
                id="image"
                src={item.node.images[0]}
                onClick={() => handleViewDetail(item.node.id)}
                alt=""
              />
              <StoryInteraction
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                countNumberOfLikes={countNumberOfLikes}
                setCountNumberOfLikes={setCountNumberOfLikes}
              />
            </div>
            <Loading loading={isFetching} />
            {fetchError?.message && (
              <ErrorPopup message={fetchError?.message} />
            )}
          </div>
        )}
      </>
    ),
    [
      countNumberOfLikes,
      fetchError?.message,
      handleViewDetail,
      isDeletedStory,
      isFetching,
      isLiked,
      item.node,
    ]
  );
};
