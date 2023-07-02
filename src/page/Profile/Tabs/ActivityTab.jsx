import ActivityPosts from './Activity/ActivityPosts';

const Activity = ({ userAllPostData }) => {
  return (
    <div className="activity-tab">
      <ActivityPosts userAllPostData={userAllPostData} />
    </div>
  );
};

export default Activity;
