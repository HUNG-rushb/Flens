import ButtonCustom from '../../../../components/Button/ButtonCustom';
import React from 'react';
import { AwardFill } from 'react-bootstrap-icons';

const AchievementComponent = ({
  achievements,
  toggleShowModal,
  setCheckType,
}) => {
  return (
    <div className="bio-achievement">
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
      <div className="achievement-btn">
        <ButtonCustom
          text={'Add achievement'}
          type="default-4"
          onClick={() => [toggleShowModal(), setCheckType(1)]}
        />
      </div>
    </div>
  );
};

export default AchievementComponent;
