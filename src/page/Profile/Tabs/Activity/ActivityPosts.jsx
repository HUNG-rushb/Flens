import Modal from '../../../../components/Modal/ModalCustom';
import useModal from '../../../../hooks/useModal';
import Post from '../../../Home/Post';
import ImageDetail from '../../../Home/Post/ImageDetail';
import { ReportContent } from '../../../Report/ReportImageContent';
import './ActivityPosts.css';
import React, { useState } from 'react';

const ActivityPosts = ({ userAllPostData }) => {
  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  return (
    <div className="profile-activity-container">
      <div className="activity-posts">
        {userAllPostData &&
          userAllPostData?.userInfo.posts.map((item) => {
            return (
              <Post
                key={item.id}
                item={item}
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
      <Modal
        show={showReport}
        modalContent={<ReportContent image={imageToReport} />}
        handleClose={toggleShowReport}
        handleSavechanges={toggleShowReport}
      />
    </div>
  );
};

export default ActivityPosts;
