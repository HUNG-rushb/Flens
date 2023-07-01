import Post from '../../../../assets/images/Home/Post.svg';
import Avatar from '../../../../assets/images/avatar.jpg';
import ModalCustom from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import { useGetAllUserPost } from '../../../../graphql/usePost';
import PostComment from '../../../Home/Post/PostComment';
import './ActivityPosts.css';
import React, { useState } from 'react';
import { Heart, Reply, ThreeDots } from 'react-bootstrap-icons';

const ActivityPosts = () => {
  const { id: userId, profileImageURL } = useAuthState();

  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });

  const [showReport, setShowReport] = useState(false);
  const [showListOtherActions, setShowListOtherActions] = useState(true);

  const handleShowReport = (item) => {
    setShowListOtherActions(true);
    setShowReport(true);
  };

  const handleShowListOtherActions = (state) => {
    setShowListOtherActions(!state);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const handleSaveReport = () => {
    setShowReport(false);
  };

  const modalReportContent = () => {
    return (
      <>
        <div className="report-photo-container">
          <img src={Post} alt="" width={'50%'} />

          <div className="left-report-photo">
            <span>Report this photo with reason:</span>
            <ul>
              <li>
                <input type="checkbox" /> <span>Copyright infringement</span>{' '}
              </li>
              <li>
                <input type="checkbox" />
                <span>Offensive content </span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Spam</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Mature content</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Harmful content</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="profile-activity-container">
      <div className="activity-posts">
        {fetchedData?.userInfo.posts.map((item) => {
          return (
            <div className="activity-post" key={item.id}>
              <div className="activity-post-header">
                <img src={profileImageURL} alt="" />
                <div>
                  <div>
                    <span id="activity-post-name">Name</span>
                    <span>Uploaded a photo</span>
                  </div>
                  <div id="activity-post-time">1 day ago</div>
                </div>
              </div>
              <div className="activity-post-image">
                <img src={item.image.url} alt="" />
              </div>

              <div className="activity-post-description">
                <span>Tittle</span>
                <div className="activity-post-interaction">
                  <div className="activity-post-like-icon">
                    <Heart size={25} /> <span>45</span>
                  </div>
                  <div className="activity-post-more-options">
                    <Reply size={30} />

                    <ThreeDots
                      size={30}
                      onClick={() =>
                        handleShowListOtherActions(() => showListOtherActions)
                      }
                      className="otherAction"
                    />

                    <div
                      className="activity-list-options"
                      hidden={showListOtherActions}
                    >
                      <ul>
                        <li onClick={handleShowReport}>Report</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr />
                <PostComment item={item} />
              </div>
            </div>
          );
        })}
      </div>

      <ModalCustom
        show={showReport}
        size="lg"
        modalTitle="Report Photo"
        modalContent={modalReportContent()}
        handleClose={handleCloseReport}
        confirmButtonMessage="Submit"
        handleSavechanges={handleSaveReport}
      />
    </div>
  );
};

export default ActivityPosts;
