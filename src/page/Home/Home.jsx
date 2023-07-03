import ModalReportImage from '../../components/Modal/ModalReportImage';
import useModal from '../../components/Modal/useModal';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetAllUserPost } from '../../graphql/usePost';
import './Home.css';
import LeftContent from './LeftContent';
import Post from './Post';
import ImageDetail from './Post/ImageDetail';
import UploadBar from './UploadBar';
import { Suspense, useState } from 'react';

const Home = () => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);

  const { id: userId } = useAuthState();

  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });

  if (fetchError) {
    return <p>Error</p>;
  }

  return (
    <Page title={'FLens-Home'}>
      <Suspense>
        <div className="home-page">
          <LeftContent />
          <div className="right-content">
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
          <ImageDetail
            item={itemShowDetail}
            showImageDetail={showImageDetail}
            handleCloseImageDetail={toggleImageDetail}
          />
          <ModalReportImage
            show={showReport}
            image={imageToReport}
            handleClose={toggleShowReport}
            handleSavechanges={toggleShowReport}
          />
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
