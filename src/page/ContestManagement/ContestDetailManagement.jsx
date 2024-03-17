import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { useAuthState } from '../../context/AuthContext';
import {
  useGetContestInfo,
  useGetContestPosts,
  useEndContest,
} from '../../graphql/useContest';
import useModal from '../../hooks/useModal';
import Post from '../../page/Home/Post/Post';
import ErrorPopup from '../../utils/errorPopup';
import unixToDateTime from '../../utils/unixToDateTime';
import Loading from '../../utils/useLoading';
import './ContestDetailManagement.scss';
import RankingBoard from './RankingBoard';
import React, { useRef, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ContestDetail = () => {
  const navigate = useNavigate();
  const { contestId } = useParams();
  const { id: userId } = useAuthState();
  const fileInputRef = useRef(null);
  const {
    fetchedData: contestInfo,
    isFetching: loadContest,
    fetchError: loadContestError,
    refetch: contestInfoRefetch,
  } = useGetContestInfo({
    contestInfoData: { contestId },
  });
  console.log({ contestInfo });
  const { posts, hasNextPage, isFetching, fetchError, loadNew, refetch } =
    useGetContestPosts(contestId, userId);
  const { endContest } = useEndContest();

  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const handleCloseModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const handleEndContest = async () => {
    const a = await endContest({ variables: { data: { contestId } } });
    console.log(a);

    navigate('/contest-management');
  };

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

          <div className="below-content-wrapper">
            {posts && <RankingBoard contestId={contestId} posts={posts} />}

            <div className="content-wrapper">
              <div className="description">
                <span id="subtitle">Description</span>
                <p>{contestInfo?.contestInfo.description}</p>
              </div>

              <div className="contest-date">
                <span id="subtitle">Deadline</span>
                <div className="date-item">
                  <span>Start date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.startDate || '')}
                </div>

                <div className="date-item">
                  <span>End date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.endDate || '')}
                </div>
              </div>

              {!contestInfo?.contestInfo.isFinished && (
                <div
                  style={{
                    margin: '10px 0',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    text="End contest!"
                    onClick={handleEndContest}
                    id="end-contest-btn"
                  />
                </div>
              )}

              <hr />

              {posts?.length ? (
                <InfiniteScroll
                  dataLength={posts.length}
                  next={() => {
                    loadNew();
                  }}
                  hasMore={hasNextPage}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>---</b>
                    </p>
                  }
                >
                  {posts.map((item) => {
                    return (
                      <Post
                        key={item.node.id}
                        item={item.node}
                        userId={item.node.userId.id}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  <b>No Attendant</b>
                </p>
              )}
            </div>
          </div>
        </div>
        <Loading loading={loadContest} />
        {loadContestError?.message && (
          <ErrorPopup message={loadContestError?.message} />
        )}

        <Modal
          show={showModal}
          modalTitle="Contest submition"
          modalContent={<div />}
          submitText="Upload Entry"
          size="xl"
          handleClose={handleCloseModal}
        />
      </>
    ),
    [
      contestInfo?.contestInfo.contestImageURL,
      contestInfo?.contestInfo.name,
      contestInfo?.contestInfo.description,
      contestInfo?.contestInfo.startDate,
      contestInfo?.contestInfo.endDate,
      posts,
      contestId,
      hasNextPage,
      loadContest,
      loadContestError?.message,
      showModal,
      handleCloseModal,
      loadNew,
    ]
  );
};

export default ContestDetail;
