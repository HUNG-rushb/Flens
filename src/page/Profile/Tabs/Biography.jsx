import ExperienceComponent from './Biography/Experience.jsx';
import PersonalInforAndEdit from './Biography/PersonalInformationAndEdit.jsx';
import SkillsComponent from './Biography/Skills.jsx';

const Biography = () => {
  return (
    <div className="biography-tab">
      <div className="bio-left">
        <ExperienceComponent />
        <SkillsComponent />
      </div>
      <PersonalInforAndEdit />
    </div>
  );
};

export default Biography;
