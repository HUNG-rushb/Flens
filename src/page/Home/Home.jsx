import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetNewFeed } from '../../graphql/usePost';
import { useGetAllUserPost } from '../../graphql/usePost';
import useModal from '../../hooks/useModal';
import { ReportContent } from '../ReportManagement/ReportImageContent';
import './Home.scss';
import LeftContent from './LeftContent/LeftContent.jsx';
import Post from './Post/Post';
import ImageDetail from './Post/ImageDetail';
import RightContent from './RightContent/RightContent.jsx';
import { Suspense, useCallback, useState } from 'react';
import { CameraFill, PencilSquare } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';

const Home = () => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);

  const { id: userId } = useAuthState();

  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetNewFeed(userId);

  const navigate = useNavigate();

  const handleToUploadImage = useCallback(() => {
    navigate('/upload');
  }, [navigate]);

  const handleToUploadStory = useCallback(() => {
    navigate('/uploadStory');
  }, [navigate]);

  return (
    <Page title={'FLens-Home'}>
      <Suspense fallback={null}>
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
                  <div
                    className="upload-story"
                    onClick={handleToUploadStory}
                  >
                    <PencilSquare size={28} color="#F08080" id="upload-icon" />
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
                      userId={userId}
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

          <Modal
            show={showReport}
            modalContent={<ReportContent image={imageToReport} />}
            handleClose={toggleShowReport}
            handleSavechanges={toggleShowReport}
          />
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
