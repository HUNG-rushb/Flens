import React, { Suspense, useState } from 'react';
import Page from '../components/utils/Page.js';
import InputCustom from '../components/Input/Input.jsx';

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
