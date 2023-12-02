import Page from '../../../components/utils/Page';
import { useMemo } from 'react';

const PostDetail = () => {
  return useMemo(
    () => (
      <Page title="Flens-Post detail">
        <div className="container">post detail</div>
      </Page>
    ),
    []
  );
};

export default PostDetail;
