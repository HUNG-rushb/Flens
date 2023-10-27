import ActivityPosts from './Activity/ActivityPosts';
import { useMemo } from 'react';

const Activity = ({}) => {
  return useMemo(
    () => (
      <div className="activity-tab">
        <ActivityPosts />
      </div>
    ),
    []
  );
};

export default Activity;
