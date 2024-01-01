import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import {
  useGetAllUserLeaderBoard,
  useUserFollowingLeaderBoard,
} from '../../graphql/useUser';
import { boardData } from './LeaderBoard/data';
import './styles.scss';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TruckFlatbed } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const LeaderBoard = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();

  const { fetchedData: userAllLeader } = useGetAllUserLeaderBoard(true);
  console.log(userAllLeader?.getAllUserLeaderboard, typeof userAllLeader);
  const { fetchedData: userFollowingLeader } = useUserFollowingLeaderBoard({
    data: { userId },
  });
  // console.log({ userAllLeader  });
  console.log({ userFollowingLeader });

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
  const [filteredData, setFilteredData] = useState(boardData);
  const [seachValue, setSearchValue] = useState('');

  const handleOnChangeSelected = useCallback((event) => {
    setSelected(event.target.value);
  }, []);

  const handleOnChangeSearch = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  // const filteredSelected = useCallback(() => {
  //   if (selected === 'All') setSelected('');
  //   const filteredSelected = boardData.filter((item) =>
  //     item.country.includes(selected)
  //   );
  //   setFilteredData(filteredSelected);
  // }, [selected]);

  // const filteredSearchValue = useCallback(() => {
  //   const filtedSearchValue = boardData.filter(
  //     (item) =>
  //       item.country.includes(seachValue) ||
  //       item.name.includes(seachValue) ||
  //       String(item.numberOfFollowers).includes(seachValue)
  //   );
  //   setFilteredData(filtedSearchValue);
  // }, [seachValue]);

  // useEffect(() => {
  //   filteredSelected();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected]);

  // useEffect(() => {
  //   filteredSearchValue();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [seachValue]);

  return useMemo(
    () => (
      <Page title="Flens-Leaderboard">
        <Suspense fallback={null}>
          <div className="leader-board">
            <div className="title-wrapper">
              <span id="title">Flens Leaderboard</span>
              <p>
                Find your standings, based on your activity the past 30 days
              </p>
              <span id="title">Following</span>
              <p>Photographers you are following</p>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="leader-board-content">
                <div className="filter-and-search">
                  <Select
                    options={options}
                    selected={selected}
                    onChange={handleOnChangeSelected}
                  />
                  <div className="search-bar">
                    <Input
                      type="Text"
                      placeholder="Search"
                      value={seachValue}
                      onChange={handleOnChangeSearch}
                    />
                  </div>
                </div>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <td>STT</td>
                        <td>Avatar</td>
                        <td>Name/Location</td>
                        <td>Level</td>
                      </tr>
                    </thead>
                    <tbody>
                      {userAllLeader?.getAllUserLeaderboard?.map(
                        (item, index) => (
                          <tr key={item?.id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={item?.profileImageURL}
                                alt=""
                                width={50}
                                height={50}
                                style={{
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                }}
                              />
                            </td>
                            <td>
                              <span>{item?.name} </span>
                            </td>
                            <td>{item?.level.currentLevel}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="leader-board-content">
                <div className="filter-and-search">
                  <Select
                    options={options}
                    selected={selected}
                    onChange={handleOnChangeSelected}
                  />
                  <div className="search-bar">
                    <Input
                      type="Text"
                      placeholder="Search"
                      value={seachValue}
                      onChange={handleOnChangeSearch}
                    />
                  </div>
                </div>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <td>STT</td>
                        <td>Avatar</td>
                        <td>Name/Location</td>
                        <td>Level</td>
                      </tr>
                    </thead>
                    <tbody>
                      {userAllLeader?.getAllUserLeaderboard?.map(
                        (item, index) => (
                          <tr key={item?.id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={item?.profileImageURL}
                                alt=""
                                width={50}
                                height={50}
                                style={{
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                }}
                              />
                            </td>
                            <td>
                              <span>{item?.name} </span>
                            </td>
                            <td>{item?.level.currentLevel}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [
      options,
      selected,
      handleOnChangeSelected,
      seachValue,
      handleOnChangeSearch,
      userAllLeader,
    ]
  );
};

export default LeaderBoard;
