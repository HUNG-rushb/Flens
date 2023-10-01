// import HashTag from './Post/HashTag.jsx';
import PostComment from './Post/PostComment.jsx';
import PostHeader from './Post/PostHeader.jsx';
import PostImageAndTitle from './Post/PostImageAndTitle.jsx';
import PostInteraction from './Post/PostInteraction.jsx';
import { useState } from 'react';

const Post = ({
  item,
  userId,
  showImageDetail,
  toggleImageDetail,
  showReport,
  toggleShowReport,
  setImageToReport,
  setItemShowDetail,
}) => {
  const [isDeletedPost, setIsDeletedPost] = useState(false);

  return (
    <>
      {isDeletedPost ? (
        <p>Post deleted successfully!</p>
      ) : (
        <div className="posts">
          <PostHeader item={item} userId={userId} />

          <div className="post-content">
            <PostImageAndTitle
              item={item}
              toggleImageDetail={toggleImageDetail}
              setItemShowDetail={setItemShowDetail}
              showImageDetail={showImageDetail}
            />

            {/* <HashTag item={item} /> */}

            <PostInteraction
              item={item}
              showReport={showReport}
              setImageToReport={setImageToReport}
              toggleShowReport={toggleShowReport}
              handleDeletePost={setIsDeletedPost}
            />

            <PostComment item={item} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
