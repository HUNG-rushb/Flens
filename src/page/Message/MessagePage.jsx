import './Message.css';
import React from 'react';
import { Masonry } from 'react-visual-grid';

const Avatar = () => {

  return (
    <Masonry fillMode="VERTICAL" className='container'>
      <span className={`rc-w-100 rc-h-100`}>
        <img alt="" src={`https://picsum.photos/id/10/100/100`} />
      </span>
      <span className={`rc-w-100 rc-h-200`}>
        <img alt="" src={`https://picsum.photos/id/11/100/100`} />
      </span>
      <span className={`rc-w-200 rc-h-300`}>
        <img alt="Image 3" src={`https://picsum.photos/id/13/200/100`} />
      </span>
      <span className={`rc-w-150 rc-h-100`}>
        <img alt="Image 4" src={`https://picsum.photos/id/14/100/100`} />
      </span>
      <span className={`rc-w-150 rc-h-200`}>
        <img alt="Image 5" src={`https://picsum.photos/id/15/200/100`} />
      </span>
      <span className={`rc-w-100 rc-h-100`}>
        <img alt="" src={`https://picsum.photos/id/10/100/100`} />
      </span>
      <span className={`rc-w-100 rc-h-200`}>
        <img alt="" src={`https://picsum.photos/id/11/100/100`} />
      </span>
      <span className={`rc-w-200 rc-h-300`}>
        <img alt="Image 3" src={`https://picsum.photos/id/13/200/100`} />
      </span>
      <span className={`rc-w-150 rc-h-100`}>
        <img alt="Image 4" src={`https://picsum.photos/id/14/100/100`} />
      </span>
      <span className={`rc-w-150 rc-h-200`}>
        <img alt="Image 5" src={`https://picsum.photos/id/15/200/100`} />
      </span>
    </Masonry>
  );
};

export default Avatar;
