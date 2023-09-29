import Modal from '../../components/Modal/ModalCustom';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetNewFeed } from '../../graphql/usePost';
import { useGetAllUserPost } from '../../graphql/usePost';
import useModal from '../../hooks/useModal';
import { ReportContent } from '../Report/ReportImageContent';
import './Home.css';
import LeftContent from './LeftContent';
import Post from './Post';
import ImageDetail from './Post/ImageDetail';
import RightContent from './RightContent';
import UploadBar from './UploadBar';
import Lottie from 'lottie-react';
import { Suspense, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);

  const { id: userId } = useAuthState();

  const { posts, hasMore, isFetching, fetchedData, fetchError, loadNew } =
    useGetNewFeed(userId);
  console.log({ posts }, 'in Home');
  // console.log({ fetchedData });
  // console.log(fetchedData?.userInfo.posts.length);

  // if (fetchError) {
  //   return (
  //     <Lottie
  //       animationData={require('../../assets/lotties/error_loading.json')}
  //       style={{ height: 300 }}
  //     />
  //   );
  // }

  return (
    <Page title={'FLens-Home'}>
      <Suspense>
        <div className="home-page">
          <LeftContent />

          {/* <div className="homepage-center-container">
            <div className="homepage-center-content">
              <UploadBar />
              {isFetching && <Spinner />}

              {fetchedData &&
                fetchedData.userInfo.posts.map((item) => {
                  return (
                    <Post
                      key={item.id}
                      item={item}
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
            </div>
          </div> */}

          {/* <div className="homepage-center-container">
            <div className="homepage-center-content">
              <UploadBar />

              <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
                next={loadNew}
                // !!!!!
                hasMore={true}
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
          </div> */}

          <RightContent />

          {/* <ImageDetail
            item={itemShowDetail}
            showImageDetail={showImageDetail}
            handleCloseImageDetail={toggleImageDetail}
          /> */}

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
