import TextareaCustom from '../../../components/TextArea/Textarea';
import { useState } from 'react';
import { Send } from 'react-bootstrap-icons';

const PostComment = ({ item, showImageDetail }) => {
  const [comment, setComment] = useState('');

  const handleSubmitComment = () => {};

  const check = showImageDetail ? 1 : 2;
  return (
    <div className="post-comments">
      <div className="post-comment-header">
        <img src={item.avatar} alt="avatar-comment" width="40" />
        <TextareaCustom
          type={'comment'}
          placeholder={'Add a comment'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          id="btn-submit-cmt"
          onClick={() => handleSubmitComment(item)}
        >
          <Send size={25} />
        </button>
      </div>
      <div className="list-reply-comments">
        {item.comments.map((i) => (
          <div className="reply-comment" key={item.comments.indexOf(i)}>
            <img
              src={i.image}
              alt="reply-comment"
              width={check === 1 ? '17%' : '5%'}
            />
            <span>{i.name}</span>
            <div className="reply-comment-content">{i.content}</div>
            <div className="reply-comment-date">
              <span>Reply </span> {i.time}
            </div>
          </div>
        ))}
        {item.comments.length > 1 ? (
          <div className="View-more-comments">
            View more {item.comments.length} comments ...
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PostComment;
