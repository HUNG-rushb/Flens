import React, { Suspense } from 'react';
import Page from '../components/utils/Page.js';
const ChatApp = React.lazy(() => import('chatApp/ChatApp'));

const MessagePage = () => {
  return (
    <Page title="BKU-Message">
      <div>Message</div>

      <Suspense fallback={null}>
        <ChatApp />
      </Suspense>
    </Page>
  );
};

export default MessagePage;
