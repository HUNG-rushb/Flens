import { useAuthState } from '../../../context/AuthContext';
import { useGetAllUserPost } from '../../../graphql/usePost';
import useModal from '../../../hooks/useModal';
import Post from '../../Home/Post';
import React, { useState } from 'react';

const PhotoEntries = () => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();

  const [imageToReport, setImageToReport] = useState('');
  const [itemShowDetail, setItemShowDetail] = useState(null);
  const { id: userId } = useAuthState();

  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });
  return (
    <div className="photo-entries-container">
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
  );
};

export default PhotoEntries;
