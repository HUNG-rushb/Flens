import Avatar from '../../assets/images/avatar2.jpg';
import InputCustom from '../../components/Input/Input';
import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page';
import './LeaderBoard.css';
import React, { Suspense } from 'react';

const LeaderBoard = () => {
  const options = [ 
    { id: 1, value: 'Inspiration' },
    { id: 2, value: 'Hot' },
    { id: 3, value: 'Newest' },
    { id: 4, value: 'stories' },
  ];

  const table_data = [
    {
      id: 1,
      img: Avatar,
      name: 'Tom',
      country: 'New York, USA',
      numberOfFollowers: 200,
    },
    {
      id: 2,
      img: Avatar,
      name: 'John',
      country: 'Ho Chi Minh, Vietnam',
      numberOfFollowers: 140,
    },
    {
      id: 3,
      img: Avatar,
      name: 'Anna',
      country: 'Seoul, Korea',
      numberOfFollowers: 120,
    },
    {
      id: 4,
      img: Avatar,
      name: 'Bob',
      country: 'Tokyo, Japan',
      numberOfFollowers: 100,
    },
    {
      id: 5,
      img: Avatar,
      name: 'Hank',
      country: 'London, UK',
      numberOfFollowers: 100,
    },
  ];

  return (
    <Page title={'Flens-Leaderboard'}>
      <Suspense fallback={null}>
        <div className="leaderboard">
          <div className="leaderboard-title-page">
            <span>Flens Leaderboard</span>
            <p>Find your standings, based on your activity the past 30 days</p>
            <span>Followers</span>
            <p>Photographers you are following</p>
          </div>
          <div className="leaderboard-body-page">
            <div className="filter-and-search-part">
              <SelectCustom options={options} className="select-bar" />
              <div className="search-bar">
                <InputCustom type={'Text'} placeholder="Search" />
              </div>
            </div>
            <div className="table-part">
              <table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Avatar</td>
                    <td>Location</td>
                    <td>Follower</td>
                  </tr>
                </thead>
                <tbody>
                  {table_data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img src={item.img} alt="" width={50} />
                        </td>
                        <td>
                          {item.name} <div>{item.country}</div>
                        </td>
                        <td>{item.numberOfFollowers} Followes</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default LeaderBoard;
