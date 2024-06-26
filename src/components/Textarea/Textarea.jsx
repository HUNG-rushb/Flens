import './Textarea.css';

const Textarea = ({ type, placeholder, ...props }) => {
  return (
    <textarea
      className={`TextArea Textarea--${type}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Textarea;
