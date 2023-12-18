import Page from '../../components/utils/Page';
import './styles.scss';
import { useMemo } from 'react';

const AdminHome = () => {
  return useMemo(
    () => (
      <Page title="Flens-Admin home">
        <div className="admin-home-container">
          <p>admin home</p>
        </div>
      </Page>
    ),
    []
  );
};

export default AdminHome;
