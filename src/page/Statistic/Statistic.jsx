import Page from '../../components/utils/Page.js';
import { useGetStatistic } from '../../graphql/usePost.js';
import './styles.scss';
import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Tab, Tabs } from 'react-bootstrap';

const Statistic = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const userOptions = {
  //   chart: {
  //     id: 'user-apexchart',
  //   },
  //   xaxis: {
  //     categories: [
  //       'January',
  //       'February',
  //       'March',
  //       'April',
  //       'May',
  //       'June',
  //       'July',
  //       'August',
  //       'September',
  //       'October',
  //       'November',
  //       'December',
  //     ],
  //   },
  // };

  // const userSeries = useMemo(
  //   () => [
  //     {
  //       name: 'Number of users',
  //       data: [
  //         1990, 2580, 2778, 5670, 4495, 6900, 6580, 6496, 7898, 7279, 8900,
  //         8245,
  //       ],
  //     },
  //   ],
  //   []
  // );

  const { fetchedData: statistic } = useGetStatistic();
  // console.log({ statistic });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postOptions = {
    chart: {
      id: 'post-apexchart',
    },
    xaxis: {
      categories: ['November 2023', 'December 2023', 'January 2024'],
    },
  };

  const postSeries = useMemo(() => {
    let a = _.pick(
      _.countBy(statistic ? statistic.allPostsTimestamp : [], 'month'),
      [1, 12, 11]
    );
    console.log({ a });

    return [
      {
        name: 'Number of posts',
        data: [a['11'] ? a['11'] : 0, a['12'] ? a['12'] : 0, a['1']],
      },
    ];
  }, [statistic]);

  return useMemo(
    () => (
      <Page title={'Flens-Statistic'}>
        <Suspense fallback={null}>
          <div className="statistic">
            <div className="title">Statistic</div>
            <div className="chart-data">
              <Tabs defaultActiveKey="post">
                {/* <Tab eventKey="user" title="Users">
                  <Chart
                    options={userOptions}
                    series={userSeries}
                    type="bar"
                    width={1000}
                    height={450}
                  />
                </Tab> */}
                <Tab eventKey="post" title="Posts">
                  <Chart
                    options={postOptions}
                    series={postSeries}
                    type="bar"
                    width={1000}
                    height={450}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [postOptions, postSeries]
  );
};

export default Statistic;
