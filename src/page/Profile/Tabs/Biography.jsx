import ExperienceComponent from './Biography/Experience.jsx';
import PersonalInforAndEdit from './Biography/PersonalInformationAndEdit.jsx';
import SkillsComponent from './Biography/Skills.jsx';

const Biography = ({ userId }) => {
  return (
    <div className="biography-tab">
      <div className="bio-left">
        <ExperienceComponent userId={userId} />
        <SkillsComponent userId={userId} />
      </div>
      <PersonalInforAndEdit userId={userId} />
    </div>
  );
};

export default Biography;
