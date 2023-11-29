import HeaderStory from '../../components/Header/Header';
import { useGetExploreStory, useGetStoryInfo } from '../../graphql/useStory';
import ErrorPopup from '../../utils/errorPopup';
import Loading from '../../utils/useLoading';
import StoryInteraction from './Story/StoryInteraction';
import './styles.scss';
import React, { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';

const StoryPage = () => {
  const { stories, hasNextPage, isFetching, fetchError, loadNew } =
    useGetExploreStory({ limit: 5, after: '' });
  const [reportedStories, setReportedStories] = useState([]);

  return useMemo(
    () => (
      <div className="stories">
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
            if (reportedStories.includes(item.node.id))
              return <div key={item.node.id}></div>;
            return (
              <Story
                item={item}
                key={item?.node?.id}
                setReportedList={setReportedStories}
              />
            );
          })}
        </InfiniteScroll>

        <Loading loading={isFetching} />
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </div>
    ),
    [
      fetchError?.message,
      hasNextPage,
      isFetching,
      loadNew,
      reportedStories,
      stories,
    ]
  );
};

const Story = ({ item, setReportedList }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
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
              setReportedList={setReportedList}
            />

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

              <div>
                {item.node.categoryId.map((category, idx) => (
                  <p key={idx}>{category.name}</p>
                ))}
              </div>
              <div>{item.node.tag}</div>

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
      setReportedList,
    ]
  );
};

export default StoryPage;
