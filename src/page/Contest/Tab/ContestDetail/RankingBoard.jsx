import React from 'react';

const Ranking = ({ data }) => {
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
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id + index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.avatar} alt="" width={40} height={40} />
                    <span> {item.username}</span>
                  </td>
                  <td>{item.linkPost}</td>
                  <td>{item.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
