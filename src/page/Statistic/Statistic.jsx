import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';
import './Statistic.css'

const Statistic = () => {
  return (
    <Page title={'Flens-Statistic'}>
      <Suspense fallback={null}>Statistic management page</Suspense>
    </Page>
  );
};

export default Statistic;
