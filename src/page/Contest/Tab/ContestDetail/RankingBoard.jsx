import React from 'react';

const Ranking = ({ top5, posts, refetch }) => {

  // console.log({ top5 });

  return (
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
          <p>No attendant, be the first candidate to be on the board !!!</p>
        )}
      </div>
    </div>
  );
};

export default Ranking;
