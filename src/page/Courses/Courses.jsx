import './Courses.css';
import { quiz } from './Courses/quiz';
import React from 'react';
import Quiz from 'react-quiz-component';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const handleCLickBack = () => {
    navigate('/academy');
  };
  return (
    <div className="courses-detail">
      <span className="back-btn" onClick={handleCLickBack}>
        &lt; Back
      </span>
      <Quiz quiz={quiz} />
    </div>
  );
};

export default Courses;
