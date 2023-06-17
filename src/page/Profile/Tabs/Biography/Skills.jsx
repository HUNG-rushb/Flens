import ButtonCustom from '../../../../components/Button/ButtonCustom';
import InputCustom from '../../../../components/Input/Input';
import ModalCustom from '../../../../components/Modal/Modal';
import { useState } from 'react';

const SkillsComponent = () => {
  const [showSkill, setShowSkill] = useState(false);

  const [skills, setSkills] = useState([
    {
      id: 1,
      value: 'Visual',
    },
    {
      id: 2,
      value: 'Color',
    },
    {
      id: 3,
      value: 'Animal',
    },
    {
      id: 4,
      value: 'Human',
    },
    {
      id: 5,
      value: 'Food',
    },
  ]);

  const handleShowSkill = () => {
    setShowSkill(true);
  };

  const SkillsList = () => {
    return (
      <>
        {skills.map((item) => {
          return <div key={item.id}>{item.value}</div>;
        })}
      </>
    );
  };

  const [initialSkill, setInitialSkill] = useState({
    id: 0,
    value: '',
  });

  const handleClose = () => {
    setShowSkill(false);
  };

  const SubmitSkills = () => {
    skills.push(initialSkill);
    setSkills(skills);
    setShowSkill(false);
  };

  const modalContent = () => {
    return (
      <>
        <InputCustom
          type={'text'}
          value={initialSkill.skill}
          onChange={(e) =>
            setInitialSkill({
              id: skills[skills.length - 1].id + 1,
              value: e.target.value,
            })
          }
        />
      </>
    );
  };

  return (
    <div className="bio-skills">
      <div className="skills-text">
        <span>Skills:</span>
        <div className="badge-container">
          <SkillsList />
        </div>
      </div>

      <div className="skill-btn">
        <ButtonCustom
          text={'Add Skill'}
          type="default2"
          onClick={handleShowSkill}
        />
        <form onSubmit={(e) => SubmitSkills(e)}>
          <ModalCustom
            show={showSkill}
            handleclick={handleShowSkill}
            handleClose={handleClose}
            modalTitle="Input new skill"
            modalContent={modalContent()}
            handleSavechanges={SubmitSkills}
            confirmButtonMessage="Submit"
            size="md"
          />
        </form>
      </div>
    </div>
  );
};

export default SkillsComponent;
