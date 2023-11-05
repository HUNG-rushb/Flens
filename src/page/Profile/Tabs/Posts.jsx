import ProfilePosts from './Posts/Posts';
import { useMemo } from 'react';

const Posts = () => {
  return useMemo(
    () => (
      <div className="activity-tab">
        <ProfilePosts />
      </div>
    ),
    []
  );
};

export default Posts;
