import './ActivityPosts.css';
import Post from '../../../Home/Post';
import React, { useState } from 'react';
import ImageDetail from '../../../Home/Post/ImageDetail';
import useModal from '../../../../components/Modal/useModal';
import { useGetAllUserPost } from '../../../../graphql/usePost';
import ModalReportImage from '../../../../components/Modal/ModalReportImage';

const ActivityPosts = ({ userId }) => {
  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });

  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);

  return (
    <div className="profile-activity-container">
      <div className="activity-posts">
        {fetchedData &&
          fetchedData.userInfo.posts.map((item) => {
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
      <ModalReportImage
        show={showReport}
        image={imageToReport}
        handleClose={toggleShowReport}
        handleSavechanges={toggleShowReport}
      />
    </div>
  );
};

export default ActivityPosts;
