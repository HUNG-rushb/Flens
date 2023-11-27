import { useGetTop5Posts } from '../../../../graphql/useContest';
import React from 'react';

const Ranking = ({ contestId }) => {
  console.log({ contestId });

  const { fetchedData: top5, refetch } = useGetTop5Posts({
    data: { contestId },
  });
  console.log({ top5 });

  return (
    <div className="ranking-board-container">
      <div className="ranking-board-content">
        <h3>Ranking Board</h3>
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
              {top5.getTopPostContest.map((item, index) => {
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
      </div>
    </div>
  );
};

export default Ranking;
