import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';

const MessagePage = () => {
  return (
    <Page title="Flens-Message">
      <Suspense fallback={null}>
        <div className="message-page">message page</div>
      </Suspense>
    </Page>
  );
};

export default MessagePage;
