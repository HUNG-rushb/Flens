import { quiz } from './quiz';
import React from 'react';
import Quiz from 'react-quiz-component';

const InteractiveCourses = ({ testQuiz, setTestQuiz }) => {
  const handleCLickBack = () => {
    setTestQuiz(false);
  };
  return (
    <>
      {!testQuiz && (
        <div className="interactive-courses-detail-container">
          <span id="courses-detail-title">Basic of Photography</span>
          <p>
            Photography is an art form that captures moments and emotions
            through images. Understanding shutter speed, aperture, and ISO,
            known as the exposure triangle, is crucial. Shutter speed freezes or
            blurs motion, aperture controls depth of field, and ISO adjusts
            light sensitivity. Mastering these basics empowers you to create
            captivating photographs that tell stories and evoke emotions.
            Explore composition, lighting, and post-processing techniques to
            further enhance your skills and bring your creative vision to life.
            Start your photographic journey today and unlock a world of endless
            possibilities.
          </p>
          <div className="interactive-courses-detail-content">
            <div>
              <span id="courses-detail-subtitle">Shutter speed</span>
              <p>
                Shutter speed refers to the length of time the camera's shutter
                remains open, allowing light to reach the camera's sensor. It is
                measured in seconds or fractions of a second. A fast shutter
                speed (e.g., 1/1000s) freezes motion and is ideal for capturing
                fast-moving subjects, while a slow shutter speed (e.g., 1/30s)
                creates motion blur and is useful for capturing long exposures
                or intentional motion effects.
              </p>
            </div>
            <div>
              <span id="courses-detail-subtitle">Aperture</span>
              <p>
                Aperture refers to the opening of the camera's lens diaphragm
                through which light enters. It is measured in f-stops,
                represented by numbers like f/2.8, f/4, f/8, etc. A lower
                f-number (e.g., f/2.8) represents a larger aperture opening,
                allowing more light to enter, resulting in a shallow depth of
                field (where the subject is in focus, and the background is
                blurred). A higher f-number (e.g., f/16) represents a smaller
                aperture opening, allowing less light and resulting in a larger
                depth of field (where both the subject and the background are in
                focus).
              </p>
            </div>
            <div>
              <span id="courses-detail-subtitle">ISO</span>
              <p>
                ISO measures the sensitivity of the camera's image sensor to
                light. A low ISO value (e.g., ISO 100) is less sensitive to
                light, suitable for well-lit environments, whereas a high ISO
                value (e.g., ISO 1600 or higher) is more sensitive to light,
                useful for low-light or nighttime photography. However, higher
                ISO settings may introduce digital noise or graininess into the
                image, so it's important to find the right balance based on the
                available light conditions.
              </p>
            </div>
            <hr />
          </div>
          <div>
            <button id="practice-quiz-button" onClick={() => setTestQuiz(true)}>
              Practice with quiz
            </button>
          </div>
        </div>
      )}
      {testQuiz && (
        <>
          <div>
            <button id="back-btn" onClick={handleCLickBack}>
              Back to courses
            </button>
          </div>
          <Quiz quiz={quiz} />
        </>
      )}
    </>
  );
};

export default InteractiveCourses;
