import './Button.css';
import React from 'react';

const Button = ({ text, type = '', disabled = false, ...props }) => {
  return (
    <button className={`Button button--${type}`} {...props} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
