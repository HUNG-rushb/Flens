import React, { Suspense } from 'react';
import Page from '../components/utils/Page.js';
// const ChatApp = React.lazy(() => import('chatApp/ChatApp'));

const MessagePage = () => {
  return (  
    <Page title="Flens-Message">

      <Suspense fallback={null}> 
        <div>Message</div>
      </Suspense>
    </Page>
  );
};

export default MessagePage;
