import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetNewFeed } from '../../graphql/usePost';
import { useCreateReport } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';
import { ReportContent } from '../ReportManagement/ReportImageContent';
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
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState({
    image: '',
    postId: '',
    userId: '',
    reason: 'Copyright infringement',
  });

  const [itemShowDetail, setItemShowDetail] = useState(null);

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetNewFeed(userId);
  // console.log({ posts });
  console.log(posts.length, 'total posts');

  const { createReport } = useCreateReport();

  const handleToUploadImage = useCallback(() => {
    navigate('/upload');
  }, [navigate]);

  const handleToUploadStory = useCallback(() => {
    navigate('/uploadStory');
  }, [navigate]);

  const reportPost = async () => {
    try {
      await createReport({
        variables: {
          createReportData: {
            postId: imageToReport.postId,
            userId: imageToReport.userId,
            reason: imageToReport.reason,
            userReported: userId,
          },
        },
      });

      toggleShowReport();
    } catch (e) {}
  };

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
                        index={idx}
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
              </div>
            </div>

            <RightContent />

            <ImageDetail
              item={itemShowDetail}
              showImageDetail={showImageDetail}
              handleCloseImageDetail={toggleImageDetail}
            />
            <Loading loading={isFetching} />
            <Modal
              show={showReport}
              modalContent={
                <ReportContent
                  image={imageToReport.image}
                  setImageToReport={setImageToReport}
                />
              }
              handleClose={toggleShowReport}
              handleSavechanges={reportPost}
            />
          </div>
        )}
      </Suspense>
    </Page>
  );
};

export default Home;
