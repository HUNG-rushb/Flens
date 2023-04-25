import HashTag from './Post/HashTag.jsx';
import PostComment from './Post/PostComment.jsx';
import PostHeader from './Post/PostHeader.jsx';
import PostImageAndTitle from './Post/PostImageAndTitle.jsx';
import PostInteraction from './Post/PostInteraction.jsx';
import PostTeachnical from './Post/PostTeachnicalInformation.jsx';

const Post = ({ item }) => {
  return (
    <div className="posts">
      <PostHeader item={item} />
      <div className="post-content">
        <PostImageAndTitle item={item} />
        <PostTeachnical item={item} />
        <HashTag item={item} />
        <PostInteraction />
        <PostComment item={item} />
      </div>
    </div>
  );
};

export default Post;
