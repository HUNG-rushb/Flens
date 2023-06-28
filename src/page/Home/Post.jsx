// import HashTag from './Post/HashTag.jsx';
import ImageDetail from './Post/ImageDetail.jsx';
import PostComment from './Post/PostComment.jsx';
import PostHeader from './Post/PostHeader.jsx';
import PostImageAndTitle from './Post/PostImageAndTitle.jsx';
import PostInteraction from './Post/PostInteraction.jsx';
import PostTeachnical from './Post/PostTeachnicalInformation.jsx';
import { useState } from 'react';

const Post = ({ item }) => {
  const [showImageDetail, setShowImageDetail] = useState(false);

  const handleShowImageDetail = () => {
    setShowImageDetail(true);
  };

  const handleCloseImageDetail = () => {
    setShowImageDetail(false);
  };

  return (
    <div className="posts">
      <PostHeader item={item} />

      <div className="post-content">
        <PostImageAndTitle
          item={item}
          handleShowImageDetail={handleShowImageDetail}
        />

        <PostTeachnical item={item} showImageDetail={showImageDetail} />

        {/* <HashTag item={item} /> */}

        <PostInteraction item={item} />

        <PostComment item={item} showImageDetail={showImageDetail} />
      </div>

      <ImageDetail
        item={item}
        showImageDetail={showImageDetail}
        handleCloseImageDetail={handleCloseImageDetail}
      />
    </div>
  );
};

export default Post;
