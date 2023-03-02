import React, { Suspense } from 'react';
import {
  CameraFill,
  PencilSquare,
  Heart,
  Reply,
  ThreeDots,
} from 'react-bootstrap-icons';
import Avatar from '../../assets/images/avatar.jpg';
import Avatar2 from '../../assets/images/avatar2.jpg';
import Post from '../../assets/images/post.jpg';
import Page from '../../components/utils/Page';
import './Home.css';

function ListPosts() {
  return (
    <div className="posts">
      <div className="post-header">
        <img src={Avatar2} alt="post-avatar" />
        <div>
          <span>Nguyen Van A</span>
          uploaded a photo
          <div>1 day ago</div>
        </div>
      </div>

      <div className="post-content">
        <img src={Post} alt="post" />
        <div className="post-title">Title</div>
        <div className="post-detail">Some information about the picture.</div>

        <div className="post-information">
          <div>
            <span>Camera:</span> Hasselblad L1D-20C
          </div>
          <div>
            <span>Focal length:</span> 16mm
          </div>
          <div>
            <span>Shutter Speed:</span> 1/500 s
          </div>
          <div>
            <span>ISO:</span> 100
          </div>
          <div>
            <span>Date:</span> JAN 19, 2001
          </div>
        </div>

        <div className="hash-tags">
          <span>#HashTag1</span>
          <span>#HashTag2</span>
          <span>#HashTag3</span>
        </div>

        <div className="post-interaction">
          <div className="like-icon">
            <Heart />
            <span>50</span>
          </div>
          <div className="reply-icon">
            <Reply />
            <ThreeDots />
          </div>
        </div>
        <hr style={{ border: '1px solid #F08080' }} />

        <div className="post-comments">
          <div className="post-comment-header">
            <img src={Avatar2} alt="avatar-comment" />
            <span>Add a comment</span>
          </div>

          <div className="list-reply-comments">
            <div className="reply-comment">
              <img src={Avatar2} alt="reply-comment" />
              <span>John</span>
              <div className="reply-comment-content">Really nice.</div>
              <div className="reply-comment-date">
                <span>Reply </span> 2 hours ago
              </div>
            </div>

            <div className="reply-comment">
              <img src={Avatar2} alt="reply-comment" />
              <span>Dom</span>
              <div className="reply-comment-content">Awesome!</div>
              <div className="reply-comment-date">
                <span>Reply </span> 1 hours ago
              </div>
            </div>

            <div className="View-more-comments">View more 3 comments ...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
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
            <div className="upload-bar">
              <div className="upload-title">
                Write something about your day!
              </div>
              <hr style={{ border: '1px solid #F08080' }} />
              <div className="upload-content">
                <div className="upload-images">
                  <CameraFill />
                  Upload a photo
                </div>
                <div className="upload-storys">
                  <PencilSquare />
                  Publish a Story
                </div>
                <button className="post-Button" type="submit">
                  Post
                </button>
              </div>
            </div>

            <ListPosts />
            <ListPosts />

            
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Home;
