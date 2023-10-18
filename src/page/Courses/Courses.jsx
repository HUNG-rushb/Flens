import './Courses.css';
import InteractiveCourses from './Courses/InteractiveCourses';
import VideoCourses from './Courses/VideoCourses';
import WorkshopCourses from './Courses/WorkshopCourses';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const checkPath = path[2];
  const [testQuiz, setTestQuiz] = useState(false);

  const handleCLickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return useMemo(
    () => (
      <div className="courses-detail-page">
        {!testQuiz && (
          <div>
            <button id="back-btn" onClick={handleCLickBack}>
              Back
            </button>
          </div>
        )}
        {checkPath === 'interactiveCourses' && (
          <InteractiveCourses testQuiz={testQuiz} setTestQuiz={setTestQuiz} />
        )}
        {checkPath === 'videoCourses' && <VideoCourses />}
        {checkPath === 'workshop' && <WorkshopCourses />}
      </div>
    ),
    [checkPath, handleCLickBack, testQuiz]
  );
};

export default Courses;
