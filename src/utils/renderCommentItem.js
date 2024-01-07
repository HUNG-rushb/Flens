import { renderCommentHeader } from './renderCommentHeader.js';
import sliceUsername from './sliceUsername.js';
import { relativeDays } from './unixToDateTime.js';

const renderChildComment = (
  childComment,
  userLevel,
  handleClickReply,
  replyToComment,
  userAvatar,
  replyComment,
  commentId,
  handleReplyCommentChange,
  handleSubmitRepyComment,
  showDetail
) => {
  if (!childComment) {
    return <></>;
  }
  return childComment?.map((item, index) => (
    <div
      className="comment-wrapper"
      key={index + item?.id}
      style={{ marginLeft: '45px' }}
    >
      <img
        src={item?.userId?.profileImageURL}
        id="comment-avatar"
        height={40}
        width={40}
        alt=""
      />
      <span id="comment-username">
        {sliceUsername(item?.userId?.name, 20)}
        <span id="user-level">{userLevel}</span>
      </span>

      <div id="comment-content">{item?.content}</div>
      <div
        className="comment-infor"
        style={showDetail ? { marginLeft: 45 } : {}}
      >
        <span
          id="reply-text"
          onClick={() => handleClickReply(item?.id)}
          style={showDetail ? { fontWeight: 600, fontSize: 12 } : {}}
        >
          Reply
        </span>
        <span id="comment-date" style={showDetail ? { marginLeft:10 } : {}}>{relativeDays(item?.createdAt)}</span>
      </div>
      {replyToComment === item?.id &&
        renderCommentHeader(
          'reply-comment',
          userAvatar,
          30,
          replyComment,
          commentId,
          handleReplyCommentChange,
          handleSubmitRepyComment,
          20
        )}
    </div>
  ));
};

const renderCommentItem = (
  comments,
  indexComment,
  userLevel,
  handleClickReply,
  replyToComment,
  userAvatar,
  replyComment,
  commentId,
  handleReplyCommentChange,
  handleSubmitRepyComment,
  showDetail
) => {
  return comments?.slice(0, indexComment).map((item, index) => (
    <div className="comment-wrapper" key={index + item?.id}>
      <img
        src={item?.userId.profileImageURL}
        id="comment-avatar"
        height={40}
        width={40}
        alt=""
      />
      <span id="comment-username">
        {sliceUsername(item?.userId.name, 20)}{' '}
        <span id="user-level">{userLevel}</span>
      </span>

      <div id="comment-content">{item?.content}</div>
      <div
        className="comment-infor"
        style={showDetail ? { marginLeft: 45 } : {}}
      >
        <span
          id="reply-text"
          onClick={() => handleClickReply(item?.id)}
          style={showDetail ? { fontWeight: 600, fontSize:12 } : {}}
        >
          Reply
        </span>
        <span id="comment-date" style={showDetail ? { marginLeft: 10 } : {}}>{relativeDays(item?.createdAt)}</span>
      </div>
      {replyToComment === item?.id &&
        renderCommentHeader(
          'reply-comment',
          userAvatar,
          30,
          replyComment,
          commentId,
          handleReplyCommentChange,
          handleSubmitRepyComment,
          20
        )}
      {renderChildComment(
        item?.child,
        userLevel,
        handleClickReply,
        replyToComment,
        userAvatar,
        replyComment,
        commentId,
        handleReplyCommentChange,
        handleSubmitRepyComment,
        showDetail
      )}
    </div>
  ));
};

export default renderCommentItem;
