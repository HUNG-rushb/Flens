import { useGetTop5Posts } from '../../graphql/useContest';
import React, { useMemo, useEffect } from 'react';

const Ranking = ({ contestId, posts }) => {
  // console.log({ contestId });

  const { fetchedData: top5, refetch } = useGetTop5Posts({
    data: { contestId },
  });
  console.log({ top5 });

  return useMemo(
    () => (
      <div className="ranking-board-container">
        <div className="ranking-board-content">
          <h3>Ranking Board</h3>

          <button onClick={() => refetch()}>Refresh</button>

          {posts?.length ? (
            <table>
              <thead>
                <tr>
                  <td>Position</td>
                  <td>user</td>
                  <td>Post entry</td>
                  <td>Points</td>
                </tr>
              </thead>

              {top5 && (
                <tbody>
                  {top5.getTopContestPosts.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.userId.profileImageURL}
                            alt=""
                            width={40}
                            height={40}
                          />
                          <span> {item.userId.name}</span>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          ) : (
            <p>No attendant !!!</p>
          )}
        </div>
      </div>
    ),
    [top5, posts]
  );
};

export default Ranking;
