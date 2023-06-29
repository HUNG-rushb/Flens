import './Contest.css';
import React, { useEffect, useState } from 'react';

const fakeContestData = {
  submissionGuidelines:
    'Submit your best original photos in JPG format. Maximum file size: 5MB.',
  prizes: [
    { id: 1, title: 'First Place - $500' },
    { id: 2, title: 'Second Place - $300' },
    { id: 3, title: 'Third Place - $200' },
  ],
};

const Contest = () => {
  return (
    <div className="contest-page">
      <div className="contest-page-container">
        <div className="contest-page-title">Flens Photography Contest</div>
        <div className="contest-page-slogan">
          Join our photography contests and showcase your skills!
        </div>

        <div className="contest-tabs">
            <div>Contest info</div>
            <div>All contest</div>
            <div>Previous winners</div>
        </div>

        <div className="contest-content">
            <div className="contests">
                <div className="contest">
                    <div className="contest-cover-image">
                        <img src="" alt="CoverImage" />
                    </div>
                </div>
            </div>
        </div>

        {/* <ul>
          {fakeContestData.prizes.map((prize) => (
            <li key={prize.id}>{prize.title}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Contest;
