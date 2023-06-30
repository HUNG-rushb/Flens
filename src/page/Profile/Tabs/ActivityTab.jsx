import ActivityPosts from './Activity/ActivityPosts';

const Activity = ({ userId }) => {
  return (
    <div className="activity-tab">
      <ActivityPosts userId={userId} />
    </div>
  );
};

export default Activity;
