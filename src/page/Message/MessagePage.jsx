import Page from '../../components/utils/Page.js';
import React, { Suspense } from 'react';
import './Message.css'
const MessagePage = () => {
  return (
    <Page title="Flens-Message">
      <Suspense fallback={null}>
        <div className="message-page">message page
        <div>
        <textarea placeholder='test' id="myTextarea"></textarea></div></div>
       
      </Suspense>
    </Page>
  );
};

export default MessagePage;
