import ActivityPosts from './Activity/ActivityPosts';
import { useMemo } from 'react';

const Activity = ({ posts, hasNextPage, loadNew, userId }) => {
  return useMemo(
    () => (
      <div className="activity-tab">
        <ActivityPosts
          posts={posts}
          hasNextPage={hasNextPage}
          loadNew={loadNew}
          userId={userId}
        />
      </div>
    ),
    [hasNextPage, loadNew, posts, userId]
  );
};

export default Activity;
