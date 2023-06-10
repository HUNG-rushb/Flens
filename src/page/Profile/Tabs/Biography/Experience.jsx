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
        <InputCustom type={'text'} />
      </>
    );
  };

  const submitExperience = () => {
    setShowExperience(false);
  };

  return (
    <div className="bio-experience">
      <div className="experience-text">
        <span>Experience:</span>
        No experiences to show, consider adding some.
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
