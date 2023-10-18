import Modal from '../../../components/Modal/Modal';
import { useAuthState } from '../../../context/AuthContext';
import { useGetNewFeed } from '../../../graphql/usePost';
import useModal from '../../../hooks/useModal';
import ImageDetail from '../../Home/Post/ImageDetail';
import Post from '../../Home/Post/Post';
import { ReportContent } from '../../ReportManagement/ReportImageContent';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const PhotoEntries = () => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { id: userId } = useAuthState();

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetNewFeed(userId);

  return useMemo(
    () => (
      <div className="photo-entries-container">
        {posts.map((item, index) => {
          return (
            <InfiniteScroll
              dataLength={posts.length}
              next={() => {
                loadNew();
              }}
              key={index}
              hasMore={hasNextPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Post
                key={'post_' + index}
                item={item.node}
                userId={userId}
                showReport={showReport}
                showImageDetail={showImageDetail}
                toggleShowReport={toggleShowReport}
                setImageToReport={setImageToReport}
                toggleImageDetail={toggleImageDetail}
                setItemShowDetail={setItemShowDetail}
              />
            </InfiniteScroll>
          );
        })}
        <ImageDetail
          item={itemShowDetail}
          showImageDetail={showImageDetail}
          handleCloseImageDetail={toggleImageDetail}
        />

        <Modal
          show={showReport}
          modalContent={<ReportContent image={imageToReport} />}
          handleClose={toggleShowReport}
          handleSavechanges={toggleShowReport}
        />
      </div>
    ),
    [
      hasNextPage,
      imageToReport,
      itemShowDetail,
      loadNew,
      posts,
      showImageDetail,
      showReport,
      toggleImageDetail,
      toggleShowReport,
      userId,
    ]
  );
};

export default PhotoEntries;
