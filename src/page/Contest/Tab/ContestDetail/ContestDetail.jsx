import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { useGetContestInfo } from '../../../../graphql/useContest';
import useModal from '../../../../hooks/useModal';
import {
  birthdayContest,
  fashionContest,
  petContest,
  flowersContest,
  foodContest,
  landscapeContest,
} from '../contestData';
import './ContestDetail.scss';
import SubmitionContent from './SubmitionContent';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ContestDetail = () => {
  const { contestId } = useParams();
  const { fetchedData: contestInfo } = useGetContestInfo({
    contestInfoData: { contestId },
  });
  console.log({ contestInfo });

  // export const foodContest = {
  //   title: 'food',
  //   image:
  //     'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
  //   description: `Welcome to the FoodFocus Photography Competition, a delightful event that celebrates the art of capturing delectable cuisine through the lens. This exciting contest invites photographers of all backgrounds to showcase their talent in visually capturing the tantalizing essence and flavors of food. From decadent desserts to mouthwatering main courses and everything in between, participants have the opportunity to freeze moments that showcase the culinary creativity and artistry. A panel of judges, consisting of food photography experts and culinary connoisseurs, will evaluate the entries based on composition, lighting, and the ability to evoke appetite through captivating imagery. Join us in this savory competition and let your camera indulge in the vibrant world of food.`,
  //   startDate: 'July 7, 2023.',
  //   endDate: 'July 27, 2023.',
  //   prizes: [
  //     {
  //       rank: '1st',
  //       prize:
  //         '$500 gift card + A gourmet dining experience at a renowned restaurant.',
  //     },
  //     { rank: '2nd', prize: '$300 gift card + A premium kitchen gadget set.' },
  //     {
  //       rank: '3rd',
  //       prize: '$200 gift card + A 50% discount voucher at five stars restaurant',
  //     },
  //   ],
  //   uploader: 'Gordon Ramsay',
  // };

  const { isShowing: showModal, toggle: toggleModal } = useModal();

  return useMemo(
    () => (
      <>
        <div className="contest-detail-container">
          <div className="contest-header">
            <img
              src={contestInfo?.contestInfo.contestImageURL}
              id="banner-image"
              alt=""
            />
            <div className="contest-title">
              {contestInfo?.contestInfo.name} competition
            </div>
          </div>

          <div className="content-wrapper">
            <div className="description">
              <span id="subtitle">Description</span>
              <p>{contestInfo?.contestInfo.description}</p>
            </div>

            <div className="contest-date">
              <span id="subtitle">Deadline</span>
              <div className="date-item">
                <span>Start date:</span>
                {contestInfo?.contestInfo.startDate}
              </div>

              <div className="date-item">
                <span>End date:</span>
                {contestInfo?.contestInfo.endDate}
              </div>
            </div>

            {/* <div className="contest-prizes">
              <span id="subtitle">Prizes</span>
              <ul>
                {contestInfo?.contestInfo.prizes?.map((prize, index) => (
                  <li key={index}>
                    {prize.rank} - {prize.prize}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contest-uploader">
              <span id="subtitle">Uploader</span>
              <p>Mr/Ms. {contestInfo?.uploader}</p>
            </div> */}

            <div className="button-upload">
              <Button text="Join now!" type="default" onClick={toggleModal} />
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          modalTitle="Submit entry"
          modalContent={<SubmitionContent />}
          handleClose={toggleModal}
          handleSavechanges={toggleModal}
          size="lg"
        />
      </>
    ),
    [contestInfo, showModal, toggleModal]
  );
};

export default ContestDetail;
