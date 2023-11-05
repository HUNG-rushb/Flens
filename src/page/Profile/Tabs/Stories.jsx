import ProfileStories from './Stories/Stories';
import { useMemo } from 'react';

const Stories = () => {
  return useMemo(
    () => (
      <div className="activity-tab">
        <ProfileStories />
      </div>
    ),
    []
  );
};

export default Stories;
