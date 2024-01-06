import ContestBanner from '../../assets/images/Contest/contestBanner.jpeg';
import Page from '../../components/utils/Page';
import ContestInfo from './Tab/ContestInfo';
import './styles.scss';
import React, { useMemo } from 'react';

const Contest = () => {
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
          <div className="contest-content">
            <ContestInfo />
          </div>
        </div>
      </Page>
    ),
    []
  );
};

export default Contest;
