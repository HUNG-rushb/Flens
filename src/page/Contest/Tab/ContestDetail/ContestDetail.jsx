import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import useModal from '../../../../hooks/useModal';
import './ContestDetail.scss';
import {
  birthdayContest,
  fashionContest,
  petContest,
  flowersContest,
  foodContest,
  landscapeContest,
} from '../contestData';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubmitionContent from './SubmitionContent';

const ContestDetail = () => {
  const location = useLocation();
  const checkPath = location.pathname.split('/');
  const contestType = checkPath[2];
  const [selectedContest, setSelectedContest] = useState([]);

  const { isShowing: showModal, toggle: toggleModal } = useModal();

  useEffect(() => {
    let contest = [];
    switch (contestType) {
      case 'birthday':
        contest = birthdayContest;
        break;
      case 'fashion':
        contest = fashionContest;
        break;
      case 'pet':
        contest = petContest;
        break;
      case 'flowers':
        contest = flowersContest;
        break;
      case 'food':
        contest = foodContest;
        break;
      case 'landscape':
        contest = landscapeContest;
        break;
      default:
        contest = birthdayContest;
    }
    setSelectedContest(contest);
  }, [contestType]);

  return useMemo(
    () => (
      <>
        <div className="contest-detail-container">
          <div className="contest-header">
            <img src={selectedContest.image} id="banner-image" alt="" />
            <div className="contest-title">
              {selectedContest.title} competition
            </div>
          </div>

          <div className="content-wrapper">
            <div className="description">
              <span id="subtitle">Description</span>
              <p>{selectedContest.description}</p>
            </div>
            <div className="contest-date">
              <span id="subtitle">Deadline</span>
              <div className="date-item">
                <span>Start date:</span>
                {selectedContest.startDate}
              </div>
              <div className="date-item">
                <span>End date:</span>
                {selectedContest.endDate}
              </div>
            </div>
            <div className="contest-prizes">
              <span id="subtitle">Prizes</span>
              <ul>
                {selectedContest?.prizes?.map((prize, index) => (
                  <li key={index}>
                    {prize.rank} - {prize.prize}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contest-uploader">
              <span id="subtitle">Uploader</span>
              <p>Mr/Ms. {selectedContest.uploader}</p>
            </div>

            <div className="button-upload">
              <Button
                text={'Join now!'}
                type="default"
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
        <Modal
          show={showModal}
          modalTitle='Submit entry'
          modalContent={<SubmitionContent />}
          handleClose={toggleModal}
          handleSavechanges={toggleModal}
          size='lg'
        />
      </>
    ),
    [
      selectedContest.description,
      selectedContest.endDate,
      selectedContest.image,
      selectedContest?.prizes,
      selectedContest.startDate,
      selectedContest.title,
      selectedContest.uploader,
      showModal,
      toggleModal,
    ]
  );
};

export default ContestDetail;
