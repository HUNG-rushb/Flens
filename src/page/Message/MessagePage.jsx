import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';
import {} from 'react-quill'

const MessagePage = () => {
  return (
    <Page title="Flens-Message">
      <Suspense fallback={null}>
        <div className="message-page">
          Message
        </div>
      </Suspense>
    </Page>
  );
};

export default MessagePage;
