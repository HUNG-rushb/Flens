import React, { Suspense } from 'react';
import Page from '../../components/utils/Page';
import SelectCustom from '../../components/Select/Select';
import Images1 from '../../assets/images/images1.png';
import Images2 from '../../assets/images/images2.png';
import './Explore.css';

const options = [
  { value: 'Inspiration' },
  { value: 'Hot' },
  { value: 'Newest' },
  { value: 'stories' },
];

const Explore = () => {
  return (
    <Page title="Flens-Explore">
      <Suspense fallback={null}>
        <div className="explore-page">
          <div className="options-bar">
            <SelectCustom options={options} />
            <div className="options">
              {options.map((item) => (
                <span>{item.value}</span>
              ))}
            </div>
          </div>

          <div className="all-items">
            <div className="images">
              <img src={Images1} alt="images1" />
              <img src={Images2} alt="images2" />
              <img src={Images1} alt="images1" />
              <img src={Images2} alt="images2" />
            </div>
            <span>See More ...</span>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Explore;
