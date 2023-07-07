import Page from '../../components/utils/Page';
import StoryPage from '../Stories/StoryPage';
import './Explore.css';
import HotTab from './ExploreTab/HotTab.jsx';
import Inspiration from './ExploreTab/Inspiration';
import NewestTab from './ExploreTab/NewestTab.jsx';
import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const options = [
  { id: 1, value: 'Inspiration', isChecked: false },
  { id: 2, value: 'Hot', isChecked: false },
  { id: 3, value: 'Newest', isChecked: false },
  { id: 4, value: 'stories', isChecked: false },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const handleChangeTab = (index, tab) => {
    setActiveTab(index);
    navigate(`/explore/${tab}`);
  };

  const tabs = ['inspiration', 'hot', 'newest', 'stories'];
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const location = useLocation()

  useEffect(() => {
    options[0].isChecked = true;
    if(location.pathname === '/explore/stories'){
      setActiveTab(3)
    }
  }, [location]);

  return (
    <Page title="Flens-Explore">
      <Suspense fallback={null}>
        <div className="explore-page">
          <div className="options-bar">
            <div className="select-explore-container">
              <select
                id="select-option-explore"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.id}>{option.value}</option>
                ))}
              </select>
            </div>
            <div className="explore-tabs">
              {tabs.map((tab, index) => (
                <span
                  key={index}
                  className={`tab--${
                    activeTab === index ? 'active' : 'inActive'
                  }`}
                  onClick={() => handleChangeTab(index, tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          {activeTab === 0 && <Inspiration />}
          {activeTab === 1 && <HotTab />}
          {activeTab === 2 && <NewestTab />}
          {activeTab === 3 && <StoryPage />}
        </div>
      </Suspense>
    </Page>
  );
};

export default Explore;
