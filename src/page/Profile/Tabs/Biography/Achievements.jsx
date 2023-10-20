import Button from '../../../../components/Button/Button';
import React, { useMemo } from 'react';
import { AwardFill } from 'react-bootstrap-icons';
import './styles.scss';

const Achievement = ({
  achievements,
  toggleShowModal,
  setCheckType,
}) => {
  return useMemo(
    () => (
      <div className="achievement">
        <div className="achievement-text">
          <span>Achievements:</span>
          <div className="achievements-list">
            {achievements.length ? (
              <>
                {achievements.map((item) => {
                  return (
                    <div key={item.id}>
                      <AwardFill size={25} color="#f08080" />
                      {item.value}
                    </div>
                  );
                })}
              </>
            ) : (
              'No achievement to show, consider adding some.'
            )}
          </div>
        </div>
        <div className="add-button">
          <Button
            text="Add achievement"
            type="default2"
            onClick={() => [toggleShowModal(), setCheckType(1)]}
          />
        </div>
      </div>
    ),
    [achievements, setCheckType, toggleShowModal]
  );
};

export default Achievement;
