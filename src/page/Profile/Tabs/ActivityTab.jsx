import ActivityPosts from './Activity/ActivityPosts';
import { useMemo } from 'react';

const Activity = ({ userAllPostData }) => {
  return useMemo(
    () => (
      <div className="activity-tab">
        <ActivityPosts userAllPostData={userAllPostData} />
      </div>
    ),
    [userAllPostData]
  );
};

export default Activity;
