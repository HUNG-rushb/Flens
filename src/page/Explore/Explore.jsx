import Images1 from '../../assets/images/images1.png';
import Images2 from '../../assets/images/images2.png';
import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page';
import './Explore.css';
import React, { Suspense } from 'react';

const options = [
  { id: 1, value: 'Inspiration' },
  { id: 2, value: 'Hot' },
  { id: 3, value: 'Newest' },
  { id: 4, value: 'stories' },
];

const images = [
  { id: 1, image: Images1 },
  { id: 2, image: Images2 },
  { id: 3, image: Images1 },
  { id: 4, image: Images2 },
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
                <span key={item.id}>{item.value}</span>
              ))}
            </div>
          </div>

          <div className="all-items">
            <div className="images">
              {images.map((item) => ( <img src={item.image} alt="item" width={500} height={300} />))}
            </div>
            <span>See More ...</span>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Explore;
