import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import { useGetAllUserPost } from '../../../../graphql/usePost';
import useModal from '../../../../hooks/useModal';
import Loading from '../../../../utils/useLoading';
import ImageDetail from '../../../Home/Post/ImageDetail';
import Post from '../../../Home/Post/Post';
import { ReportContent } from '../../../ReportManagement/ReportImageContent';
import './styles.scss';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';

const ProfilePosts = () => {
  const { userId } = useParams();
  const { id: currentUserId } = useAuthState();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetAllUserPost(userId, currentUserId);
  console.log({ posts });

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
          <li>You have posted <span id='special-text'>{totalPost}</span> posts ! </li>
          <li>Total likes achieved: <span id='special-text'>{totalLike} </span></li>
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
                  key={'post_' + item.node.id}
                  item={item.node}
                  userId={item.node.userId.id}
                  showReport={showReport}
                  showImageDetail={showImageDetail}
                  toggleShowReport={toggleShowReport}
                  setImageToReport={setImageToReport}
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

      <ImageDetail
        item={itemShowDetail}
        showImageDetail={showImageDetail}
        handleCloseImageDetail={toggleImageDetail}
      />
      <Loading loading={isFetching} />
      <Modal
        show={showReport}
        modalContent={<ReportContent image={imageToReport} />}
        handleClose={toggleShowReport}
        handleSavechanges={toggleShowReport}
      />
    </div>
  );
};

export default ProfilePosts;
