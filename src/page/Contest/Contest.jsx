import ContestBanner from '../../assets/images/Contest/contestBanner.jpeg';
import Page from '../../components/utils/Page';
import { useGetAllContest } from '../../graphql/useContest';
import ContestInfo from './Tab/ContestInfo';
import PhotoEntries from './Tab/PhotoEntries';
import PreviousWinner from './Tab/PreviousWinner';
import './styles.scss';
import React, { useCallback, useMemo, useState } from 'react';

const Contest = () => {
  const { fetchedData: allContests } = useGetAllContest();
  console.log({ allContests });
  const tabs = useMemo(
    () => ['Contest Info', 'Photo Entries', 'Previous Winners'],
    []
  );
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = useCallback((index) => {
    setActiveTab(index);
  }, []);

  return useMemo(
    () => (
      <Page title="Flens-Contest">
        <div className="contests-wrapper">
          <div className="contest-banner">
            <img src={ContestBanner} id="banner-image" alt="" />
            <div className="contest-header">
              <div className="contest-title">Flens Photography Contest</div>
              <div className="contest-slogan">
                Join our photography contests and showcase your skills!
              </div>
            </div>
          </div>
          <div className="contest-tabs">
            {tabs.map((tab, index) => (
              <span
                key={index}
                className={`tab--${
                  activeTab === index ? 'active' : 'inActive'
                }`}
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
      </Page>
    ),
    [activeTab, handleChangeTab, tabs]
  );
};

export default Contest;
