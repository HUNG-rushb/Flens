import React from 'react';

const HashTag = ({ item }) => {
  return (
    <div className="hash-tags">
      {item.hashTag.map((i, index) => (
        <span key={index}>#{i.tag}</span>
      ))}
    </div>
  );
};

export default HashTag;
