import { useMemo } from 'react';

const LeaderBoardTittle = () => {
  return useMemo(
    () => (
      <div className="leaderboard-title-page">
        <span>Flens Leaderboard</span>
        <p>Find your standings, based on your activity the past 30 days</p>
        <span>Followers</span>
        <p>Photographers you are following</p>
      </div>
    ),
    []
  );
};

export default LeaderBoardTittle;
