import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';
import './Courses.css'

const Courses = () => {
  return (
    <Page title={'Flens-Courses'}>
      <Suspense fallback={null}>Courses management page</Suspense>
    </Page>
  );
};

export default Courses;
