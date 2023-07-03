import './ContestTab.css';
import React from 'react';
import { useNavigate} from 'react-router-dom';

const contests = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'birthday',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/2036650/pexels-photo-2036650.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'fashion',
  },
  {
    idd: 3,
    image:
      'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'pet',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'flowers',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'food',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'landscape',
  },
];

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
