import Button from '../../../components/Button/Button';
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

  const data = [
    {
      id: 1,
      value: 'Animal',
    },
    {
      id: 2,
      value: 'Artist',
    },
    {
      id: 3,
      value: 'Nature',
    },
  ];

  return useMemo(
    () => (
      <div className="biography-tab">
        <div className="bio-left-container">
          <Achievement achievements={achievements} />
          <div className="interests" style={{display:"flex", alignItems:"center",}}>
            <div className="interest-text">
              <span>Skills and Endorments:</span>
              <div className="badge-wrapper">
                {data.map((item) => {
                  return <div key={item.id}>{item.value}</div>;
                })}
              </div>
            </div>

            <div
              className="add-button"
              style={{
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginTop:"30px"
              }}
            >
              <Button
                text="Add your skills"
                type="default2"
              
                // onClick={handleAddInterestClick}
              />
            </div>
          </div>
          <Interests />
        </div>
        <PersonalInfo />
      </div>
    ),
    [achievements]
  );
};

export default Biography;
