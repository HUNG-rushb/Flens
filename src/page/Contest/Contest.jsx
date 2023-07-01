import ContestBanner from '../../assets/images/Contest/contestBanner.jpeg';
import './Contest.css';
import ContestInfo from './contestTab/ContestInfo.jsx';
import PhotoEntries from './contestTab/PhotoEntries.jsx';
import PreviousWinner from './contestTab/PreviousWinner.jsx';
import React, { useState } from 'react';

const tabs = ['Contest Info', 'Photo Entries', 'Previous Winners'];

const Contest = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (index) => { 
    setActiveTab(index);
  };

  return (
    <div className="contest-page">
      <div className="contest-page-container">
        <div className="contest-banner">
          <img src={ContestBanner} alt="" />
          <div className="contest-header">
            <div className="contest-page-title">Flens Photography Contest</div>
            <div className="contest-page-slogan">
              Join our photography contests and showcase your skills!
            </div>
          </div>
        </div>
        <div className="contest-tabs">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`tab--${activeTab === index ? 'active' : 'inActive'}`}
              onClick={() => handleChangeTab(index)}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="contest-content">
          {activeTab === 0 && <ContestInfo />}
          {activeTab === 1 && <PhotoEntries />}
          {activeTab === 2 && <PreviousWinner />}
        </div>
      </div>
    </div>
  );
};

export default Contest;
