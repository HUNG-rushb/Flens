import InputCustom from '../../../components/Input/Input.jsx';
import ModalCustom from '../../../components/Modal/ModalCustom.jsx';
import useModal from '../../../hooks/useModal.jsx';
import AchievementComponent from './Biography/Achievements.jsx';
import HobbyComponent from './Biography/Hobbies.jsx';
import PersonalInforAndEdit from './Biography/PersonalInformationAndEdit.jsx';
import { useState } from 'react';

const Biography = ({ userId, userAllPostData }) => {
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();
  const [checkType, setCheckType] = useState(0);
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
  const [hobbies, setHobbies] = useState([
    {
      id: 1,
      value: 'Poitrait',
    },
    {
      id: 2,
      value: 'Flowers',
    },
    {
      id: 3,
      value: 'Fashion',
    },
    {
      id: 4,
      value: 'Food',
    },
    {
      id: 5,
      value: 'Animal',
    },
  ]);

  const [initialValue, setInitialValue] = useState({
    id: 0,
    value: '',
  });

  const addAchievementContent = () => {
    return (
      <>
        <InputCustom
          type={'text'}
          value={initialValue.achievement}
          onChange={(e) =>
            setInitialValue({
              id: achievements[achievements.length - 1].id + 1,
              value: e.target.value,
            })
          }
        />
      </>
    );
  };

  const addHobbyContent = () => {
    return (
      <>
        <InputCustom
          type={'text'}
          value={initialValue.hobby}
          onChange={(e) =>
            setInitialValue({
              id: hobbies[hobbies.length - 1].id + 1,
              value: e.target.value,
            })
          }
        />
      </>
    );
  };

  const SubmitAchivement = () => {
    achievements.push(initialValue);
    setAchievements(achievements);
    toggleShowModal();
    setCheckType(0);
  };

  const SubmitHobby = () => {
    hobbies.push(initialValue);
    setHobbies(hobbies);
    toggleShowModal();
    setCheckType(0);
  };

  return (
    <div className="biography-tab">
      <div className="bio-left">
        <AchievementComponent
          userId={userId}
          achievements={achievements}
          toggleShowModal={toggleShowModal}
          checkType={checkType}
          setCheckType={setCheckType}
        />
        <HobbyComponent
          userId={userId}
          hobbies={hobbies}
          toggleShowModal={toggleShowModal}
        />
      </div>
      <PersonalInforAndEdit userId={userId} userAllPostData={userAllPostData} />
      <ModalCustom
        show={showModal}
        handleClose={() => [toggleShowModal(), setCheckType(0)]}
        modalTitle={
          checkType === 1 ? 'Input new achievement' : 'Input new hobby'
        }
        modalContent={
          checkType === 1 ? addAchievementContent() : addHobbyContent()
        }
        handleSavechanges={checkType === 1 ? SubmitAchivement : SubmitHobby}
      />
    </div>
  );
};

export default Biography;
