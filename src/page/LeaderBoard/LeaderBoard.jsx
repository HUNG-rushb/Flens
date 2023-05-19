import Avatar from '../../assets/images/avatar2.jpg';
import InputCustom from '../../components/Input/Input';
import SelectCustom from '../../components/Select/SelectCustom';
import Page from '../../components/utils/Page';
import './LeaderBoard.css';
import Tittle from './LeaderBoard/Title';
import React, { Suspense, useState } from 'react';

const LeaderBoard = () => {
  const options = [ 
    { id: 1, value: 'All' },
    { id: 2, value: 'VietNam' },
    { id: 3, value: 'New York' },
    { id: 4, value: 'Japan' },
  ];

  const [selected, setSelected] = useState(options[0].value)
  const handleOnChange = (event) => {
    setSelected(event.target.value)
  }


  const [table_data, setTable_data] = useState([
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
      numberOfFollowers: 90,
    },
  ]);

  const Filtered = () => {
    var test_Table
    if(selected==="VietNam")
    test_Table =  table_data.filter(item => 
      item.country.includes("VietNam")
    )
    if(selected==="New York")
    test_Table =  table_data.filter(item => 
      item.country.includes("New York")
    )
    setTable_data(test_Table)
  }

  return (
    <Page title={'Flens-Leaderboard'}>
      <Suspense fallback={null}>
        <div className="leaderboard">
          <Tittle/>
          <div className="leaderboard-body-page">
            <div className="filter-and-search-part">
              <SelectCustom options={options} className="select-bar" selected={selected} handleOnChange={handleOnChange} />
              <div className="search-bar">
                <InputCustom type={'Text'} placeholder="Search" />
              </div>
            </div>
            <button onClick={Filtered}>Test</button>
            <div className="table-part">
              <table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Avatar</td>
                    <td>Name/Location</td>
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
                          <span>{item.name} </span> <div>{item.country}</div>
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
