import Page from '../../components/utils/Page';
import './404NotFound.css';
import Lottie from 'lottie-react';
import { Suspense } from 'react';

const NotFound = () => {
  return (
    <Page title={'Flens-not found page'}>
      <Suspense fallback={null}>
        <div className="d-flex not-found-page-wrapper">
          <div className="not-found-page-box">
            <div className="not-found-page-box-content">
              <Lottie
                animationData={require('../../assets/lotties/not_found_error.json')}
                style={{
                  height: 500,
                }}
              />
              <span id="page-not-found-text">
                Page not found. Please check the url !!!
              </span>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default NotFound;
