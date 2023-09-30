import ContestBanner from '../../assets/images/Contest/contestBanner.jpeg';
import './Contest.scss';
import ContestInfo from './contestTab/ContestInfo.jsx';
import PhotoEntries from './contestTab/PhotoEntries.jsx';
import PreviousWinner from './contestTab/PreviousWinner.jsx';
import React, { useCallback, useMemo, useState } from 'react';

const tabs = ['Contest Info', 'Photo Entries', 'Previous Winners'];

const Contest = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = useCallback((index) => {
    setActiveTab(index);
  }, []);

  return useMemo(
    () => (
      <div className="contests">
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
    ),
    [activeTab, handleChangeTab]
  );
};

export default Contest;
