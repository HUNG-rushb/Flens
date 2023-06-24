import Page from '../../components/utils/Page';
import './Academy.css';
import InteractiveCourses from './Academy/InteractiveCourses.jsx';
import AcademyTitle from './Academy/Tittle.jsx';
import VideoCourses from './Academy/VideoCourses.jsx';
import Workshop from './Academy/WorkShop.jsx';
import { Suspense } from 'react';

const Academy = () => {
  return (
    <Page title={'Flens-Academy'}>
      <Suspense fallback={null}>
        <div className="academy">
          <AcademyTitle />
          <div className="academy-body-page">
            <VideoCourses />
            <InteractiveCourses />
            <Workshop />
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Academy;
