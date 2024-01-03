import './styles.scss';
import React, { useMemo } from 'react';
import { AwardFill } from 'react-bootstrap-icons';

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
                      {/* <AwardFill size={25} color="#f08080" /> */}
                      <img src={item.prizeImageURL} />
                      {item.title}
                    </div>
                  );
                })}
              </>
            ) : (
              'No achievement to show, consider adding some.'
            )}
          </div>
        </div>
      </div>
    ),
    [achievements]
  );
};

export default Achievement;
