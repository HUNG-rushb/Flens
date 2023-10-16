import { previousWinner } from './contestData';
import React, { useMemo } from 'react';

const PreviousWinner = () => {
  return useMemo(
    () => (
      <div className="previous-winner-container">
        {previousWinner.map((post, index) => {
          return (
            <div className="previous-winner-post" key={index}>
              <img id="post-image" src={post.image} alt="" />
              <div className="post-content">
                <div className="post-avatar-wrapper">
                  <img id="post-avatar" src={post.avatar} alt="" />
                </div>
                <div className="post-detail">
                  <span id="winner-name">{post.name}</span>
                  <div className="post-title">
                    {post.contestTitle} contest winner
                  </div>
                  <p id="post-comment">{post.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ),
    []
  );
};

export default PreviousWinner;
