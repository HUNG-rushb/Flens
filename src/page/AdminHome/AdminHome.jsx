import Page from '../../components/utils/Page';
import './styles.scss';
import { useMemo } from 'react';

const AdminHome = () => {
  return useMemo(
    () => (
      <Page title="Flens-Admin home">
        <div className="admin-home-container">
          <div className="admin-home-item">
            <p id="admin-title">Reports management</p>
            <div className="admin-content">
              <div>
                <span>Number of reports:</span> 10
              </div>
              <div>
                <span>Approve report(s):</span> 8
              </div>
              <div>
                <span>Reject report(s):</span> 2
              </div>
            </div>
          </div>
          <div className="admin-home-item">
            <p id="admin-title">Statistics</p>
            <div className="admin-content">statistics content</div>
          </div>
          <div className="admin-home-item">
            <p id="admin-title">Contests management</p>
            <div className="admin-content">
              <div>
                <span>Number of contest(s):</span> 10
              </div>
              <div>
                <span>Happening contest(s):</span> 8
              </div>
              <div>
                <span>Finished contest(ss):</span> 2
              </div>
            </div>
          </div>
        </div>
      </Page>
    ),
    []
  );
};

export default AdminHome;
