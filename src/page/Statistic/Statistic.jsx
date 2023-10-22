import Page from '../../components/utils/Page.js';
import './styles.scss';
import React, { Suspense, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Tab, Tabs } from 'react-bootstrap';

const Statistic = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userOptions = {
    chart: {
      id: 'user-apexchart',
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  };

  const userSeries = useMemo(
    () => [
      {
        name: 'Number of users',
        data: [
          1990, 2580, 2778, 5670, 4495, 6900, 6580, 6496, 7898, 7279, 8900,
          8245,
        ],
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postOptions = {
    chart: {
      id: 'post-apexchart',
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  };

  const postSeries = useMemo(
    () => [
      {
        name: 'Number of posts',
        data: [
          2400, 2480, 2978, 5170, 4895, 6700, 6880, 6996, 7498, 7679, 8600,
          8045,
        ],
      },
    ],
    []
  );
  return useMemo(
    () => (
      <Page title={'Flens-Statistic'}>
        <Suspense fallback={null}>
          <div className="statistic">
            <div className="title">Statistic</div>
            <div className="chart-data">
              <Tabs defaultActiveKey="user">
                <Tab eventKey="user" title="Users">
                  <Chart
                    options={userOptions}
                    series={userSeries}
                    type="bar"
                    width={1000}
                    height={450}
                  />
                </Tab>
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
    [postOptions, postSeries, userOptions, userSeries]
  );
};

export default Statistic;
