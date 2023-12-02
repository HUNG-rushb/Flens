import Achievement from './Biography/Achievements';
import Interests from './Biography/Interests';
import PersonalInfo from './Biography/PersonalInfo';
import { useMemo, useState } from 'react';

const Biography = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      value: '1st prize of Fashion contest.',
    },
    {
      id: 2,
      value: '2rd prize of Food contest.',
    },
  ]);

  return useMemo(
    () => (
      <div className="biography-tab">
        <div className="bio-left-container">
          <Achievement achievements={achievements} />
          <Interests />
        </div>
        <PersonalInfo />
      </div>
    ),
    [achievements]
  );
};

export default Biography;
