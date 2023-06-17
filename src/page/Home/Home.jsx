import PostImage from '../../assets/images/Home/Post.svg';
import Avatar2 from '../../assets/images/avatar2.jpg';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useGetAllUserPost } from '../../graphql/usePost';
import './Home.css';
import LeftContent from './LeftContent';
import Post from './Post';
import UploadBar from './UploadBar';
import { Suspense } from 'react';

const Home = () => {
  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId: '6482134d9fa3fbb056c8d2fc' },
  });
  console.log(fetchedData);

  return (
    <Page title={'FLens-Home'}>
      <Suspense fallback={<div>Loading...</div>}>
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
