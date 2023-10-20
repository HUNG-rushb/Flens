import Avatar from '../../assets/images/avatar2.jpg';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Page from '../../components/utils/Page';
import './LeaderBoard.css';
import Title from './LeaderBoard/Title';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const data = [
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
];

const LeaderBoard = () => {
  const options = useMemo(
    () => [
      { id: 1, value: 'All' },
      { id: 2, value: 'Vietnam' },
      { id: 3, value: 'USA' },
      { id: 4, value: 'Japan' },
      { id: 5, value: 'Korea' },
    ],
    []
  );
  const [selected, setSelected] = useState(options[0].value);
  const [filteredData, setFilteredData] = useState(data);
  const [seachValue, setSearchValue] = useState('');

  const handleOnChangeSelected = useCallback((event) => {
    setSelected(event.target.value);
  }, []);

  const handleOnChangeSearch = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const filteredSelected = useCallback(() => {
    if (selected === 'All') setSelected('');
    const filteredSelected = data.filter((item) =>
      item.country.includes(selected)
    );
    setFilteredData(filteredSelected);
  }, [selected]);

  const filteredSearchValue = useCallback(() => {
    const filtedSearchValue = data.filter(
      (item) =>
        item.country.includes(seachValue) ||
        item.name.includes(seachValue) ||
        String(item.numberOfFollowers).includes(seachValue)
    );
    setFilteredData(filtedSearchValue);
  }, [seachValue]);

  useEffect(() => {
    filteredSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    filteredSearchValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seachValue]);

  return useMemo(
    () => (
      <Page title={'Flens-Leaderboard'}>
        <Suspense fallback={null}>
          <div className="leaderboard">
            <Title />
            <div className="leaderboard-body-page">
              <div className="filter-and-search-part">
                <Select
                  options={options}
                  className="select-bar"
                  selected={selected}
                  onChange={handleOnChangeSelected}
                />
                <div className="search-bar">
                  <Input
                    type={'Text'}
                    placeholder="Search"
                    value={seachValue}
                    onChange={handleOnChangeSearch}
                  />
                </div>
              </div>
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
                    {filteredData.map((item) => {
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
    ),
    [
      options,
      selected,
      seachValue,
      filteredData,
      handleOnChangeSearch,
      handleOnChangeSelected,
    ]
  );
};

export default LeaderBoard;
