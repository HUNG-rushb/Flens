import Textarea from '../components/Textarea/Textarea.jsx';
import { handleKeyPressComment } from './handleKeyPressComment.js';
import { Send } from 'react-bootstrap-icons';

export const renderCommentHeader = (
  type,
  avatar,
  imageSize,
  value,
  commentID,
  handleChange,
  handleSubmit,
  SendIconSize
) => {
  // console.log(commentID)
  return (
    <div className={`${type}-header`}>
      <img
        src={avatar}
        id="comment-avatar"
        height={imageSize}
        width={imageSize}
        alt=""
      />
      <Textarea
        type={type}
        placeholder="Add a comment"
        id={`textarea-comment-${commentID}`}
        value={value}
        rows={1}
        onChange={handleChange}
        onKeyDown={(event) =>
          handleKeyPressComment(event, commentID, value, handleSubmit)
        }
      />
      <button id="submit-button" onClick={handleSubmit}>
        <Send size={SendIconSize} id="send-icon" />
      </button>
    </div>
  );
};
