// import HashTag from './Post/HashTag.jsx';
import { useState } from 'react';
import PostHeader from './Post/PostHeader.jsx';
import PostComment from './Post/PostComment.jsx';
import ImageDetail from './Post/ImageDetail.jsx';
import PostInteraction from './Post/PostInteraction.jsx';
import useModal from '../../components/Modal/useModal.jsx';
import PostImageAndTitle from './Post/PostImageAndTitle.jsx';
import PostTeachnical from './Post/PostTeachnicalInformation.jsx';
import ModalReportImage from '../../components/Modal/ModalReportImage.jsx';

const Post = ({ item }) => {
  const { isShowing: showReport, toggle: toggleShowReport } = useModal();
  const { isShowing: showImageDetail, toggle: toggleImageDetail } = useModal();
  const [imageToReport, setImageToReport] = useState('');

  return (
    <div className="posts">
      <PostHeader item={item} />

      <div className="post-content">
        <PostImageAndTitle
          item={item}
          handleShowImageDetail={toggleImageDetail}
        />

        <PostTeachnical item={item} showImageDetail={showImageDetail} />

        {/* <HashTag item={item} /> */}

        <PostInteraction
          item={item}
          setImageToReport={setImageToReport}
          showReport={showReport}
          toggleShowReport={toggleShowReport}
        />

        <PostComment item={item} showImageDetail={showImageDetail} />
      </div>

      <ImageDetail
        item={item}
        showImageDetail={showImageDetail}
        handleCloseImageDetail={toggleImageDetail}
      />

      <ModalReportImage
        image={imageToReport}
        show={showReport}
        handleClose={toggleShowReport}
        handleSavechanges={toggleShowReport}
      />
    </div>
  );
};

export default Post;