import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContestDetail = () => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate('/contest');
  };
  return (
    <div className='contest-detail-page'>
        <div className="contest-detail-banner">
            <img src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
      <button onClick={handleClickBack}>back</button>
    </div>
  );
};

export default ContestDetail;
