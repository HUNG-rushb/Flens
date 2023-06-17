import ButtonCustom from '../../../../components/Button/ButtonCustom';
import InputCustom from '../../../../components/Input/Input';
import ModalCustom from '../../../../components/Modal/Modal';
import { useState } from 'react';

const ExperienceComponent = () => {
  const [showExperience, setShowExperience] = useState(false);

  const handleShowExperience = () => {
    setShowExperience(true);
  };

  const handleClose = () => {
    setShowExperience(false);
  };

  const modalContent = () => {
    return (
      <>
        <InputCustom
          type={'text'}
          value={initialExperience.skill}
          onChange={(e) =>
            setInitialExperience({
              id: experiences[experiences.length - 1].id + 1,
              value: e.target.value,
            })
          }
        />
      </>
    );
  };

  const [experiences, setExperience] = useState({
    id: 0,
    value: 'portrait photography',
  });

  const [initialExperience, setInitialExperience] = useState({
    id: 0,
    value: '',
  });

  const submitExperience = () => {
    experiences.push(initialExperience);
    setExperience(experiences);
    setShowExperience(false);
  };

  const ExperienceList = () => {
    return (
      <>
        {experiences.map((item) => {
          return <div key={item.id}>{item.value}</div>;
        })}
      </>
    );
  };

  return (
    <div className="bio-experience">
      <div className="experience-text">
        <span>Experience:</span>
        No experiences to show, consider adding some.
        {/* <ExperienceList /> */}
      </div>
      <div className="exp-btn">
        <ButtonCustom
          text={'Add Experience'}
          type="default2"
          onClick={() => handleShowExperience()}
        />
        <ModalCustom
          show={showExperience}
          handleclick={handleShowExperience}
          handleClose={handleClose}
          modalTitle="Input new Experience"
          modalContent={modalContent()}
          handleSavechanges={submitExperience}
          confirmButtonMessage="Submit"
          size="md"
        />
      </div>
    </div>
  );
};

export default ExperienceComponent;
