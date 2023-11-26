import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetNewFeed } from '../../graphql/usePost';
import useModal from '../../hooks/useModal';
import ErrorPopup from '../../utils/errorPopup';
import Loading from '../../utils/useLoading';
import './Home.scss';
import LeftContent from './LeftContent/LeftContent';
import ImageDetail from './Post/ImageDetail';
import Post from './Post/Post';
import RightContent from './RightContent/RightContent';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { CameraFill, PencilSquare } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();
  const [itemShowDetail, setItemShowDetail] = useState(null);

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetNewFeed(userId);

  const handleToUploadImage = useCallback(() => {
    navigate('/upload');
  }, [navigate]);

  const handleToUploadStory = useCallback(() => {
    navigate('/uploadStory');
  }, [navigate]);

  useEffect(() => {
    if (posts?.length <= 1) loadNew();
  }, [loadNew, posts]);

  return (
    <Page title="FLens-Home">
      <Suspense fallback={null}>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="home-page">
            <LeftContent />
            <div className="center-container">
              <div className="center-content">
                <div className="upload-bar">
                  <div className="content">
                    <div className="upload-image" onClick={handleToUploadImage}>
                      <CameraFill size={28} color="#F08080" id="upload-icon" />
                      Upload a photo
                    </div>
                    <div className="upload-story" onClick={handleToUploadStory}>
                      <PencilSquare
                        size={28}
                        color="#F08080"
                        id="upload-icon"
                      />
                      Publish a Story
                    </div>
                  </div>
                </div>

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
                        key={'post_' + idx}
                        item={item.node}
                        showImageDetail={showImageDetail}
                        toggleImageDetail={toggleImageDetail}
                        setItemShowDetail={setItemShowDetail}
                      />
                    );
                  })}
                </InfiniteScroll>
              </div>
            </div>
            <RightContent />
            <ImageDetail
              item={itemShowDetail}
              showImageDetail={showImageDetail}
              handleCloseImageDetail={toggleImageDetail}
            />
            <Loading loading={isFetching} />
            {fetchError?.message && (
              <ErrorPopup message={fetchError?.message} />
            )}
          </div>
        )}
      </Suspense>
    </Page>
  );
};

export default Home;
