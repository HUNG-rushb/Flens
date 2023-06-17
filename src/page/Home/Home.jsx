import PostImage from '../../assets/images/Home/Post.svg';
import Post2 from '../../assets/images/Home/images1.png';
import Avatar2 from '../../assets/images/avatar2.jpg';
import Page from '../../components/utils/Page';
import { useGetAllUserPost } from '../../graphql/usePost';
import './Home.css';
import LeftContent from './LeftContent';
import Post from './Post';
import UploadBar from './UploadBar';
import { Suspense } from 'react';

const posts = [
  {
    id: 101,
    name: 'Nguyen Van A',
    avatar: Avatar2,
    time: '1 day ago',
    image: PostImage,
    title: 'Title',
    content: 'Some information about the picture.',
    technical: {
      camera: 'Hasselblad L1D-20C',
      focalLength: '16mm',
      shutterSpeed: '1/500 s',
      iso: 100,
    },
    date: 'JAN 19, 2001',
    hashTag: [
      {
        tag: 'HashTag1',
      },
      {
        tag: 'HashTag2',
      },
      {
        tag: 'HashTag3',
      },
    ],
    numberOfLike: 51,
    comments: [
      {
        name: 'John',
        image: Avatar2,
        content: 'Really nice.',
        time: '2 hours ago',
      },
      {
        name: 'Dom',
        image: Avatar2,
        content: 'Awesome!',
        time: '1 hours ago',
      },
    ],
  },
  {
    id: 201,
    name: 'Nguyen Van A',
    avatar: Avatar2,
    time: '1 day ago',
    image: Post2,
    title: 'Title',
    content: 'Some information about the picture.',
    technical: {
      camera: 'Hasselblad L1D-20C',
      focalLength: '16mm',
      shutterSpeed: '1/500 s',
      iso: 100,
    },
    date: 'JAN 19, 2001',
    hashTag: [
      {
        tag: 'HashTag1',
      },
      {
        tag: 'HashTag2',
      },
      {
        tag: 'HashTag3',
      },
    ],
    numberOfLike: 51,
    comments: [
      {
        name: 'John',
        image: Avatar2,
        content: 'Really nice.',
        time: '2 hours ago',
      },
      {
        name: 'Dom',
        image: Avatar2,
        content: 'Awesome!',
        time: '1 hours ago',
      },
    ],
  },
];

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

            {fetchedData &&
              fetchedData.userInfo.posts.map((item) => {
                return <Post key={item.id} item={item} />;
              })}
            {/* {posts.map((item) => {
              return <Post key={item.id} item={item} />;
            })} */}
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
