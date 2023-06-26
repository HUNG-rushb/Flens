import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useAuthState } from '../../context/AuthContext';
import { useGetAllUserPost } from '../../graphql/usePost';
import './Home.css';
import LeftContent from './LeftContent';
import Post from './Post';
import UploadBar from './UploadBar';
import { Suspense } from 'react';

const Home = () => {
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
                return <Post key={item.id} item={item} />;
              })}
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
