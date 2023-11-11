import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import {
  useGetContestInfo,
  useGetContestPosts,
} from '../../../../graphql/useContest';
import useModal from '../../../../hooks/useModal';
import './ContestDetail.scss';
import SubmitionContent from './SubmitionContent';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContestDetail = () => {
  const { contestId } = useParams();
  const { fetchedData: contestInfo } = useGetContestInfo({
    contestInfoData: { contestId },
  });
  console.log({ contestInfo });
  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetContestPosts(contestId);
  console.log({ posts });

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

            {/* <InfiniteScroll
                  dataLength={posts.length}
                  next={() => {
                    loadNew();
                  }}
                  hasMore={hasNextPage}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {posts.map((item, idx) => {
                    return (
                      <Post
                        key={'post_' + idx}
                        item={item.node}
                        userId={item.node.userId.id}
                        showReport={showReport}
                        showImageDetail={showImageDetail}
                        toggleShowReport={toggleShowReport}
                        setImageToReport={setImageToReport}
                        toggleImageDetail={toggleImageDetail}
                        setItemShowDetail={setItemShowDetail}
                      />
                    );
                  })}
                </InfiniteScroll> */}
          </div>
        </div>

        <Modal
          show={showModal}
          modalTitle="Submit entry"
          modalContent={<SubmitionContent contestId={contestId} />}
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
