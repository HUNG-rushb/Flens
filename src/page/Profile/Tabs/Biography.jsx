import InputCustom from '../../../components/Input/Input.jsx';
import ModalCustom from '../../../components/Modal/ModalCustom.jsx';
import useModal from '../../../hooks/useModal.jsx';
import AchievementComponent from './Biography/Achievements.jsx';
import HobbyComponent from './Biography/Hobbies.jsx';
import PersonalInforAndEdit from './Biography/PersonalInformationAndEdit.jsx';
import { useCallback, useMemo, useState } from 'react';

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

  const modalTitle = useMemo(
    () => (checkType === 1 ? 'Input new achievement' : 'Input new hobby'),
    [checkType]
  );

  const modalContent = useCallback(() => {
    return (
      <>
        {checkType === 1 ? (
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
        ) : (
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
        )}
      </>
    );
  }, [
    achievements,
    checkType,
    hobbies,
    initialValue.achievement,
    initialValue.hobby,
  ]);

  const handleCloseModal = useCallback(() => {
    toggleShowModal();
    setCheckType(0);
  }, [toggleShowModal]);

  const submitModal = useCallback(() => {
    if (checkType === 1) {
      achievements.push(initialValue);
      setAchievements(achievements);
    } else if (checkType === 2) {
      hobbies.push(initialValue);
      setHobbies(hobbies);
    }
    toggleShowModal();
    setCheckType(0);
  }, [achievements, checkType, hobbies, initialValue, toggleShowModal]);

  return useMemo(
    () => (
      <div className="biography-tab">
        <div className="bio-left">
          <AchievementComponent
            achievements={achievements}
            toggleShowModal={toggleShowModal}
            setCheckType={setCheckType}
          />
          <HobbyComponent
            hobbies={hobbies}
            toggleShowModal={toggleShowModal}
            setCheckType={setCheckType}
          />
        </div>
        <PersonalInforAndEdit
          userId={userId}
          userAllPostData={userAllPostData}
        />
        <ModalCustom
          show={showModal}
          modalTitle={modalTitle}
          modalContent={modalContent()}
          handleClose={handleCloseModal}
          handleSavechanges={submitModal}
        />
      </div>
    ),
    [
      achievements,
      toggleShowModal,
      hobbies,
      userId,
      userAllPostData,
      showModal,
      handleCloseModal,
      modalTitle,
      modalContent,
      submitModal,
    ]
  );
};

export default Biography;
