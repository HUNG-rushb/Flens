import React from 'react';
import { Image } from 'react-bootstrap';
import NotFoundImage from '../assets/404.jpg';

const NotFound = () => {
  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h4>React-Bootstrap Image Component</h4>
      <Image
        src={NotFoundImage}
        alt="Description"
        width="100%"
        height="auto"
        rounded
      />
    </div>
  );
};

export default NotFound;
