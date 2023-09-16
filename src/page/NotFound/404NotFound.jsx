import Page from '../../components/utils/Page';
import './404NotFound.css';
import { Suspense } from 'react';

const NotFound = () => {
  return (
    <Page title={'Flens-not found page'}>
      <Suspense fallback={null}>
        <div className="d-flex not-found-page-wrapper">
          <div className="not-found-page-box">
            <div className="not-found-page-box-content">
              <span id="oops">oops!</span>
              <span id="something-wrong-text">something went wrong</span>
              <span id="err-404-text">404</span>
              <span id="page-not-found-text">
                Page not found. Please check the url
              </span>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default NotFound;
