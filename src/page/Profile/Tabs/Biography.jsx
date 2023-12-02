import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import { useGetUserInterest } from '../../../graphql/useUser';
import useModal from '../../../hooks/useModal';
import Achievement from './Biography/Achievements';
import Hobbies from './Biography/Hobbies';
import PersonalInfo from './Biography/PersonalInfo';
import { useCallback, useMemo, useState } from 'react';

const Biography = ({ userId, posts }) => {
  const options = useMemo(
    () => [
      { name: 'All categories', id: '64ecb68380295e50c958e547' },
      { name: 'Animal', id: '64edaf03809a20aed5684794' },
      { name: 'Architecture', id: '64edaf2d809a20aed5684795' },
      { name: 'Black and White', id: '64edaf3c809a20aed5684796' },
      { name: 'Cityscapes', id: '64edaf4c809a20aed5684797' },
      { name: 'Family', id: '64edaf62809a20aed5684798' },
      { name: 'Fashion', id: '64edaf66809a20aed5684799' },
      { name: 'Film', id: '64edaf72809a20aed568479a' },
      { name: 'Food', id: '64edaf77809a20aed568479b' },
      { name: 'Vintage', id: '64edafb5809a20aed568479c' },
      { name: 'Vehicle', id: '64edafbb809a20aed568479d' },
      { name: 'Urban', id: '64edafbf809a20aed568479e' },
      { name: 'Underwater', id: '64edb08f809a20aed568479f' },
      { name: 'Travel', id: '64edb0a5809a20aed56847a0' },
      { name: 'Street photography', id: '64edb0ae809a20aed56847a1' },
      { name: 'Sports', id: '64edb0c7809a20aed56847a2' },
      { name: 'Landscape', id: '64edb0df809a20aed56847a3' },
      { name: 'Nature', id: '64edb0e2809a20aed56847a4' },
      { name: 'Sea', id: '64edb0f6809a20aed56847a5' },
      { name: 'People', id: '64edb117809a20aed56847a7' },
      { name: 'Interior', id: '64edb11c809a20aed56847a8' },
      { name: 'Random', id: '64edb0f9809a20aed56847a6' },
    ],
    []
  );
  console.log({ userId });
  const { isShowing: showModal, toggle: toggleShowModal } = useModal();

  const {
    isFetching,
    fetchedData: interest,
    fetchError,
  } = useGetUserInterest({
    userInfoData: { userId },
  });
  console.log({ interest });
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

  const modalContent = useCallback(() => {
    return <></>;
  }, []);

  const handleCloseModal = useCallback(() => {
    toggleShowModal();
  }, [toggleShowModal]);

  const submitModal = useCallback(() => {
    toggleShowModal();
  }, []);

  return useMemo(
    () => (
      <div className="biography-tab">
        <div className="bio-left-container">
          <Achievement achievements={achievements} />

          {interest && (
            <Hobbies hobbies={interest} toggleShowModal={toggleShowModal} />
          )}
        </div>

        <PersonalInfo posts={posts} />

        <Modal
          show={showModal}
          modalTitle="Input new hobby"
          modalContent={modalContent()}
          handleClose={handleCloseModal}
          handleSavechanges={submitModal}
        />
      </div>
    ),
    [
      achievements,
      toggleShowModal,
      interest,
      posts,
      showModal,
      handleCloseModal,
      modalContent,
      submitModal,
    ]
  );
};

export default Biography;
