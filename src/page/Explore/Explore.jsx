import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page';
import './Explore.css';
import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [
  { id: 1, value: 'Inspiration', isChecked: false },
  { id: 2, value: 'Hot', isChecked: false },
  { id: 3, value: 'Newest', isChecked: false },
  { id: 4, value: 'stories', isChecked: false },
];

const images = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/15976900/pexels-photo-15976900/free-photo-of-mua-xuan-la-hoa-dong-c-a.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/17005370/pexels-photo-17005370/free-photo-of-l-nh-tuy-t-g-binh-minh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/16958120/pexels-photo-16958120/free-photo-of-thanh-ph-ngh-thu-t-d-cu-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/17211653/pexels-photo-17211653/free-photo-of-ki-n-truc-london-notting-hill-mews.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/15030610/pexels-photo-15030610/free-photo-of-mua-he-d-o-k-l-ao.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/17031087/pexels-photo-17031087/free-photo-of-g-chim-thu-v-t-m.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 7,
    image:
      'https://images.pexels.com/photos/16931198/pexels-photo-16931198/free-photo-of-g-thanh-ph-phong-c-nh-thien-nhien.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 8,
    image:
      'https://images.pexels.com/photos/16848567/pexels-photo-16848567/free-photo-of-g-phong-c-nh-n-c-nui.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 9,
    image:
      'https://images.pexels.com/photos/16158164/pexels-photo-16158164/free-photo-of-thien-nhien-th-i-trang-kinh-ram-nh-ng-ng-i.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  // {
  //   id: 10,
  //   image:
  //     'https://images.pexels.com/photos/7549484/pexels-photo-7549484.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  // },
  // {
  //   id: 11,
  //   image:
  //     'https://images.pexels.com/photos/16747487/pexels-photo-16747487/free-photo-of-d-ng-ph-xe-h-i-xe-d-cu.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  // },
  // {
  //   id: 12,
  //   image:
  //     'https://images.pexels.com/photos/16614531/pexels-photo-16614531/free-photo-of-g-ngh-thu-t-b-c-v-sang-tr-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  // }
];

const Explore = () => {
  const [countNumberColumn, setCountNumberColumn] = useState(images.length / 3);

  const navigate = useNavigate();

  const handleStoriesClick = () => {
    navigate('/stories');
  };

  const firstColum = images
    .slice(0, countNumberColumn)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt="item"
        width={500}
        height={300}
      />
    ));
  const secondColumn = images
    .slice(countNumberColumn, countNumberColumn * 2)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt="item"
        width={500}
        height={300}
      />
    ));
  const thirdColumn = images
    .slice(countNumberColumn * 2, countNumberColumn * 3)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt="item"
        width={500}
        height={300}
      />
    ));

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  console.log(selectedOption);

  useEffect(() => {
    options[0].isChecked = true;
  }, []);

  return (
    <Page title="Flens-Explore">
      <Suspense fallback={null}>
        <div className="explore-page">
          <div className="options-bar">
            <div className='select-explore-container'>
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
            <div className="options">
              <span>INSPIRATION</span>
              <span>HOT</span>
              <span>NEWEST</span>
              <span onClick={handleStoriesClick}>STORIES</span>
            </div>
          </div>

          <div className="explore-images">
            <div className="first-column-image">{firstColum}</div>
            <div className="second-column-image">{secondColumn}</div>
            <div className="third-column-image">{thirdColumn}</div>
          </div>
          <span>See More ...</span>
          <div className="same-images"></div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Explore;
