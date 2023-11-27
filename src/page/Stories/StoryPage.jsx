import HeaderStory from '../../components/Header/Header';
import { useGetExploreStory } from '../../graphql/useStory';
import ErrorPopup from '../../utils/errorPopup';
import Loading from '../../utils/useLoading';
import './styles.scss';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Heart, HeartFill, Reply } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isDeletedStory, setIsDeletedStory] = useState(false);
  const [animationWhenClick, setAnimationWhenClick] = useState(false);

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

              <div className="interaction">
                <div className="like-wrapper">
                  {renderHeartIcon()}
                  <span id="points">{item.node.points}</span>
                </div>
                <Reply size={28} />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      handleViewDetail,
      isDeletedStory,
      item.node,
      renderHeartIcon,
      setIsDeletedStory,
      setReportedList,
    ]
  );
};

export default StoryPage;
