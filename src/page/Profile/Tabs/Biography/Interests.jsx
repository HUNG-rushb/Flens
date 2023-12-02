import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import { useGetUserInterest } from '../../../../graphql/useUser';
import useModal from '../../../../hooks/useModal';
import ErrorPopup from '../../../../utils/errorPopup';
import Loading from '../../../../utils/useLoading';
import './styles.scss';
import { useState } from 'react';
import React, { useCallback, useMemo } from 'react';

const Interests = () => {
  const { id: userId } = useAuthState();
  const { isShowing: showModal, toggle: toggleModal } = useModal();
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

  const {
    isFetching,
    fetchedData: interest,
    fetchError,
  } = useGetUserInterest({
    userInfoData: { userId },
  });

  console.log({ interest });

  const [interests, setInterests] = useState(
    interest?.userInfo?.interestCategories || []
  );
  const [newInterest, setNewInterest] = useState(options[0]);

  const handleAddInterestClick = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const removeItemFromArray = (removeId, array, setArray) => {
    const removeItem = array?.filter((item) => item.id !== removeId);
    setArray(removeItem);
  };

  const handleAddNewInterest = useCallback(() => {
    console.log(interests, 'new array Interest');
    if (interests.filter((e) => e.id === newInterest.id).length === 0) {
      setInterests((prev) => [...prev, newInterest]);
    }
  }, [interests, newInterest]);

  const modalContent = useCallback(() => {
    return (
      <div className="all-interests">
        <div className="sub-interests">
          <select
            value={newInterest?.name}
            id="select-interest"
            onChange={(e) => {
              setNewInterest({
                name: e.target.value,
                id: options?.find((item) => item.name === e.target.value).id,
              });
            }}
          >
            {options?.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <div className="add-interest-button">
            <button onClick={handleAddNewInterest}>Add</button>
          </div>
        </div>
        {interests?.length > 0 && (
          <div className="interests-item">
            <span>Add these interest:</span>
            {interests?.map((item, index) => (
              <div
                key={item.id + index}
                onClick={() =>
                  removeItemFromArray(item.id, interests, setInterests)
                }
              >
                <span id="remove-interest">X</span>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }, [handleAddNewInterest, interests, newInterest?.name, options]);

  const handleCloseModal = useCallback(() => {
    toggleModal();
    setInterests(interest?.userInfo?.interestCategories || []);
    setNewInterest(options[0]);
  }, [interest?.userInfo?.interestCategories, toggleModal, options]);

  const submitModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);
  return useMemo(
    () => (
      <>
        <div className="interests">
          <div className="interest-text">
            <span>Interest:</span>
            <div className="badge-wrapper">
              {!interest?.userInfo.interestCategories.length ? (
                <p>Please add some interests</p>
              ) : (
                interest?.userInfo.interestCategories.map((item) => {
                  return <div key={item.id}>{item.value}</div>;
                })
              )}
            </div>
          </div>

          <div className="add-button">
            <Button
              text="Add your interest"
              type="default2"
              onClick={handleAddInterestClick}
            />
          </div>
        </div>

        <Loading loading={isFetching} />
        {fetchError?.message && (
          <ErrorPopup message="Get interests fail, please try again!!!" />
        )}
        <Modal
          show={showModal}
          modalTitle="Add your interests"
          modalContent={modalContent()}
          handleClose={handleCloseModal}
          handleSavechanges={submitModal}
        />
      </>
    ),
    [
      fetchError?.message,
      handleAddInterestClick,
      handleCloseModal,
      interest?.userInfo.interestCategories,
      isFetching,
      modalContent,
      showModal,
      submitModal,
    ]
  );
};

export default Interests;
