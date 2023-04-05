import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';
import './Report.css'

const Report = () => {
  return (
    <Page title={'Flens-Reports'}>
      <Suspense fallback={null}>Reports management page</Suspense>
    </Page>
  );
};

export default Report;
