import React, { Suspense } from 'react';
import Page from '../../components/utils/Page';
import './Notification.scss'

const Notification = () => {
  return (
    <Page title={"Flens-Notification"}>
      <Suspense fallback={null}>
        <div className='first'>Notification</div>
        <div className="second">second</div>
      </Suspense>
    </Page>
  )
}

export default Notification;
