import './ContestTab.css';
import React from 'react';
import { useNavigate} from 'react-router-dom';
import { contests } from './contestData';

const ContestInfo = () => {
  const navigate = useNavigate()

  const handleClickContest = (contestTitle) => {
    navigate(`/contest/${contestTitle}`)
  }
  return (
    <div className="contest-info-page">
      <div className="submit-guidlelines">
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
          {contests.map((contest, index) => (
            <div className="contest" key={index} onClick={()=>handleClickContest(contest.title)}> 
              <img src={contest.image} alt="" />
              <div className="contest-title">{contest.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestInfo;
