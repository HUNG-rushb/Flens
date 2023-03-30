import Avatar2 from '../../assets/images/avatar2.jpg';
import Avatar from '../../assets/images/avatar.jpg';
import Post from '../../assets/images/post.jpg';
import ModalCustom from '../../components/Modal/Modal';
import TextareaCustom from '../../components/TextAreaCustom/Textarea';
import Page from '../../components/utils/Page';
import './Home.css';
import React, { Suspense, useState } from 'react';
import {
  CameraFill,
  PencilSquare,
  Heart,
  HeartFill,
  Reply,
  ThreeDots,
  Send,
} from 'react-bootstrap-icons';

const posts = [
  {
    id: 1,
    name: 'Nguyen Van A',
    avatar: Avatar2,
    time: '1 day ago',
    image: Post,
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
    id: 2,
    name: 'Nguyen Van A',
    avatar: Avatar2,
    time: '1 day ago',
    image: Post,
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

function ListPosts() {
  const [comment, setComment] = useState('');
  const [countNumberOfLikes, setCountNumberOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const modalReportContent = () => {
    return <>Report this photo with reason: 
    </>;
  };

  const handleClickLikePost = () => {
    setIsLiked(!isLiked);
    if (isLiked === false) setCountNumberOfLikes(countNumberOfLikes + 1);
    else setCountNumberOfLikes(countNumberOfLikes - 1);
  };

  const submitComment = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {posts.map((item) => (
        <div className="posts" key={item.id}>
          <div className="post-header">
            <img src={item.avatar} alt="post-avatar" />
            <div>
              <span>{item.name}</span>
              uploaded a photo
              <div>{item.time}</div>
            </div>
          </div>

          <div className="post-content" key={posts.indexOf(item)}>
            <img src={item.image} alt="post" />
            <div className="post-title">{item.title}</div>
            <div className="post-detail">{item.content}</div>

            <div className="post-information">
              <div>
                <span>Camera:</span> {item.technical.camera}
              </div>
              <div>
                <span>Focal length:</span> {item.technical.focalLength}
              </div>
              <div>
                <span>Shutter Speed:</span> {item.technical.shutterSpeed}
              </div>
              <div>
                <span>ISO:</span> {item.technical.iso}
              </div>
              <div>
                <span>Date:</span> {item.date}
              </div>
            </div>

            <div className="hash-tags">
              {item.hashTag.map((i) => (
                <span key={item.hashTag.indexOf(i)}>#{i.tag}</span>
              ))}
            </div>

            <div className="post-interaction">
              <div className="like-icon" onClick={handleClickLikePost}>
                {isLiked === false ? (
                  <Heart size={30} />
                ) : (
                  <HeartFill color="red" size={30} />
                )}
                <span>{countNumberOfLikes > 0 ? countNumberOfLikes : 0}</span>
              </div>
              <div className="right-action">
                <Reply size={30} className="reply-icon" />
                <form className="otherAction">
                  <ThreeDots size={30} onClick={handleShowReport} />
                  <ModalCustom
                    show={showReport}
                    handleclick={handleShowReport}
                    handleClose={handleCloseReport}
                    modalTitle="Report Post"
                    modalContent={modalReportContent()}
                    size="md"
                  />
                </form>
              </div>
            </div>
            <hr style={{ border: '1px solid #F08080' }} />

            <div className="post-comments">
              <form
                className="post-comment-header"
                onSubmit={(e) => submitComment(e)}
              >
                <img
                  src={item.avatar}
                  alt="avatar-comment"
                  width="40"
                  height="40"
                />
                <TextareaCustom
                  type={'comment'}
                  placeholder={'Add a comment'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn-submit-cmt">
                  <Send size={30} />
                </button>
              </form>
              <div className="list-reply-comments">
                {item.comments.map((i) => (
                  <div className="reply-comment" key={item.comments.indexOf(i)}>
                    <img src={i.image} alt="reply-comment" />
                    <span>{i.name}</span>
                    <div className="reply-comment-content">{i.content}</div>
                    <div className="reply-comment-date">
                      <span>Reply </span> {i.time}
                    </div>
                  </div>
                ))}

                <div className="View-more-comments">
                  View more {item.comments.length} comments ...
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const Home = () => {
  const [yourStatus, setYourStatus] = useState('');
  const handleStatusSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Page title={'FLens-Home'}>
      <Suspense fallback={null}>
        <div className="home-page">
          <div className="left-content">
            <img src={Avatar} alt="avatar"></img>
            <div className="name">Nguyen Van A</div>
            <div className="skill-content">
              <div>
                <span>Your Flens link:</span> flens.com/quocthanhh
              </div>
              <div>
                <span>Favourites:</span> Camera, Portrait
              </div>
              <div>
                <span>Skills:</span> Portrait photography
              </div>
            </div>
          </div>

          <div className="right-content">
            <form
              className="upload-bar"
              onSubmit={(e) => handleStatusSubmit(e)}
            >
              <TextareaCustom
                type={'uploadBar'}
                placeholder="Write something about your day!"
                value={yourStatus}
                onChange={(e) => setYourStatus(e.target.value)}
              />
              <hr style={{ border: '1px solid #F08080' }} />
              <div className="upload-content">
                <div className="upload-images">
                  <CameraFill size={28} color="#F08080" />
                  Upload a photo
                </div>
                <div className="upload-storys">
                  <PencilSquare size={28} color="#F08080" />
                  Publish a Story
                </div>
                <button className="post-Button" type="submit">
                  Post
                </button>
              </div>
            </form>
            <ListPosts />
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
