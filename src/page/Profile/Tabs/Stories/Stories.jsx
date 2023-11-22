import { useAuthState } from '../../../../context/AuthContext';
import { useGetAllUserStory } from '../../../../graphql/useStory';
import unixToDateTime from '../../../../utils/unixToDateTime';
import './styles.scss';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { Heart, HeartFill, ThreeDots } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const ProfileStories = () => {
  const navigate = useNavigate();
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
            return <Story item={item} key={item.node.id} />;
          })}
        </InfiniteScroll>
      </div>
    ),
    [stories]
  );
};

export default ProfileStories;

const Story = ({ item }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleViewDetail = useCallback(
    (storyId) => {
      navigate(`/stories/${storyId}`);
    },
    [navigate]
  );

  const renderHeartIcon = useCallback(() => {
    return !isLiked ? (
      <Heart size={28} onClick={handleClickLike} />
    ) : (
      <HeartFill size={28} color="red" onClick={handleClickLike} />
    );
  }, [isLiked]);

  return useMemo(
    () => (
      <div className="story">
        <div className="header">
          <img
            id="header-avatar"
            alt=""
            src={item.node.userId.profileImageURL}
            onClick={() => navigate(`/profile/${item.node.userId.id}`)}
          />
          <div
            className="sub-header"
            onClick={() => handleViewDetail(item.node.id)}
          >
            <span id="fullname">{item.node.userId.name}</span>
            <span>{unixToDateTime(item.node.createdAt)}</span>
          </div>
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
            {renderHeartIcon()}
            <span id="points">{item.node.points}</span>
            <ThreeDots size={28} />
          </div>
        </div>
      </div>
    ),
    [handleViewDetail, renderHeartIcon]
  );
};
