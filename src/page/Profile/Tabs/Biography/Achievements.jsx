import './styles.scss';
import React, { useMemo } from 'react';

const Achievement = ({ achievements }) => {
  return useMemo(
    () => (
      <div className="achievement">
        <div className="achievement-text">
          <span>Achievements:</span>
          <div className="achievements-list">
            {achievements.getUserPrizes.length ? (
              <>
                {achievements.getUserPrizes.map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        src={item.prizeImageURL}
                        width={30}
                        height={30}
                        alt=""
                      />
                      <span style={{marginLeft:5, fontSize:16, fontWeight:400}}>{item.title}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              'No achievement to show. Join some contest to get one !'
            )}
          </div>
        </div>
      </div>
    ),
    [achievements]
  );
};

export default Achievement;
