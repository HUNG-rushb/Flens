import { useGetAllContest } from '../../../graphql/useContest';
import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ContestInfo = () => {
  const navigate = useNavigate();
  const { fetchedData: allContests } = useGetAllContest();

  const handleClickContest = useCallback(
    (id) => {
      navigate(`/contest/${id}`);
    },
    [navigate]
  );
  return useMemo(
    () => (
      <div className="contest-infor">
        <div className="contest-infor-wrapper">
          <span>Happening</span>
          <div className="all-contest">
            {allContests?.allContests
              .filter((item) => item.isFinished === false)
              .map((contest) => (
                <div
                  className="contest"
                  key={contest.id}
                  onClick={() => handleClickContest(contest.id)}
                >
                  <img
                    src={contest.contestImageURL}
                    id="contest-image"
                    alt=""
                  />
                  <div className="contest-title">{contest.name}</div>
                </div>
              ))}
          </div>

          <span>Finished</span>
          <div className="all-contest">
            {allContests?.allContests
              .filter((item) => item.isFinished === true)
              .map((contest) => (
                <div
                  className="contest"
                  key={contest.id}
                  onClick={() => handleClickContest(contest.id)}
                >
                  <img
                    src={contest.contestImageURL}
                    id="contest-image"
                    alt=""
                  />
                  <div className="contest-title">{contest.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    ),
    [handleClickContest, allContests]
  );
};

export default ContestInfo;
