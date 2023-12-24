import { useAuthState } from '../../../../context/AuthContext';
import { useGetAllUserPost } from '../../../../graphql/usePost';
import useModal from '../../../../hooks/useModal';
import ErrorPopup from '../../../../utils/errorPopup';
import Loading from '../../../../utils/useLoading';
import Post from '../../../Home/Post/Post';
import './styles.scss';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';

const ProfilePosts = () => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

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
        <p id="title">Your statistic:</p>
        <ul>
          <li>
            You have posted <span id="special-text">{totalPost}</span> posts !
          </li>
          <li>
            Total likes achieved: <span id="special-text">{totalLike} </span>
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
                <Post
                  key={'posts_' + item.node.id + idx}
                  item={item.node}
                  showImageDetail={showImageDetail}
                  toggleImageDetail={toggleImageDetail}
                  setItemShowDetail={setItemShowDetail}
                />
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
