// import HashTag from './Post/HashTag.jsx';
import PostComment from './Post/PostComment.jsx';
import PostHeader from './Post/PostHeader.jsx';
import PostImageAndTitle from './Post/PostImageAndTitle.jsx';
import PostInteraction from './Post/PostInteraction.jsx';
import PostTeachnical from './Post/PostTeachnicalInformation.jsx';

const Post = ({
  item,
  showImageDetail,
  toggleImageDetail,
  showReport,
  toggleShowReport,
  setImageToReport,
  setItemShowDetail,
}) => {
  return (
    <div className="posts">
      <PostHeader item={item} />

      <div className="post-content">
        <PostImageAndTitle
          item={item}
          toggleImageDetail={toggleImageDetail}
          setItemShowDetail={setItemShowDetail}
        />

        <PostTeachnical item={item} showImageDetail={showImageDetail} />

        {/* <HashTag item={item} /> */}

        <PostInteraction
          item={item}
          showReport={showReport}
          setImageToReport={setImageToReport}
          toggleShowReport={toggleShowReport}
        />

        <PostComment item={item} showImageDetail={showImageDetail} />
      </div>
    </div>
  );
};

export default Post;
