import './Textarea.css';

const TextArea = ({ type, placeholder, ...props }) => {
  return (
    <textarea
      className={`TextArea Textarea--${type}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default TextArea;
