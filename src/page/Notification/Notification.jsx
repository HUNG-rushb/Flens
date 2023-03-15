import Page from '../../components/utils/Page';
import './Notification.scss';
import { gql, useQuery } from '@apollo/client';
import React, { Suspense } from 'react';
import Textarea from '../../components/TextAreaCustom/Textarea'

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
      <div className="test-area">
        Test TextArea: 
        <Textarea type={"comment"} placeholder={"Add a comments"} />
      </div>
    </Page>
  );
};

export default Notification;
