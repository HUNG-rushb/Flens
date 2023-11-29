import { useGetAllContest } from '../../../graphql/useContest';
import { contests } from './contestData';
import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ContestInfo = () => {
  const navigate = useNavigate();
  const { fetchedData: allContests } = useGetAllContest();
  console.log({ allContests });

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
          <span>Submition guidlelines</span>
          <div>
            <ul>
              <li>Post your entry photo in public and send us that link.</li>
              <li>Use the #Hashtag on at least one of your entry.</li>
              <li>Your entry can be no more than 5mb.</li>
            </ul>
          </div>
          <span>Happening</span>
          <div className="all-contest">
            {allContests?.allContests.map((contest) => (
              <div
                className="contest"
                key={contest.id}
                onClick={() => handleClickContest(contest.id)}
              >
                <img src={contest.contestImageURL} id="contest-image" alt="" />
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
