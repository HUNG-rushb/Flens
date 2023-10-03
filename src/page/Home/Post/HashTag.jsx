import React from 'react';

const HashTag = ({ item }) => {
  return (
    <div className="hash-tags">
      {item.tag.map((i, index) => (
        <span key={index}>#{i}</span>
      ))}
    </div>
  );
};

export default HashTag;
