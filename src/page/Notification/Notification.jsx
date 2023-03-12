import React, { Suspense } from 'react';
import Page from '../../components/utils/Page';
import { gql, useQuery } from '@apollo/client';

import './Notification.scss';

const TEST_DATA_QUERY = gql`
  query GetTestData {
    Page {
      users {
        id
        name
        avatar {
          large
          medium
        }
      }
    }
  }
`;
const Notification = () => {
  const data = useQuery(TEST_DATA_QUERY, {});

  console.log('data', data.data);

  return (
    <Page title={'Flens-Notification'}>
      <Suspense fallback={null}>Notification</Suspense>
    </Page>
  );
};

export default Notification;
