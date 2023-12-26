import { useAuthState } from '../../../../context/AuthContext';
import { useGetAllUserPost } from '../../../../graphql/usePost';
import ErrorPopup from '../../../../utils/errorPopup';
import Loading from '../../../../utils/useLoading';
import Post from '../../../Home/Post/Post';
import './styles.scss';
import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';

const ProfilePosts = () => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetAllUserPost(userId, currentUserId);

  const totalPost = useMemo(() => posts.length, [posts.length]);
  const totalLike = useMemo(() => {
    let sum = 0;
    posts.map((item) => (sum += item.node.points));
    return sum;
  }, [posts]);

  return (
    <div className="profile-activity-container">
      <div className="statistic-posts">
        <p style={{ fontSize: 16, fontWeight: 600 }}>Your statistic:</p>
        <ul>
          <li>
            You have posted{' '}
            <span style={{ fontSize: 20, color: 'rgb(241, 102, 102)' }}>
              {totalPost}
            </span>{' '}
            posts !
          </li>
          <li>
            Total likes achieved:{' '}
            <span style={{ fontSize: 20, color: 'rgb(241, 102, 102)' }}>
              {totalLike}
            </span>
          </li>
        </ul>
      </div>
      <div className="activity-posts">
        {posts.length > 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
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
            {posts.map((item, idx) => {
              return (
                <Post key={'posts_' + item.node.id + idx} item={item.node} />
              );
            })}
          </InfiniteScroll>
        ) : (
          `You haven't upload yet !!!`
        )}
      </div>
      <Loading loading={isFetching} />
      {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
    </div>
  );
};

export default ProfilePosts;
