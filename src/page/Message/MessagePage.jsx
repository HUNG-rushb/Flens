import React from 'react';
import useModal from '../../components/Modal/useModal';
import ModalReportImage from '../../components/Modal/ModalTest.jsx'

const MessagePage = () => {
  const {isShowing, toggle} = useModal();
  return (  
    <div>
      <h1>Message page</h1>
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <ModalReportImage
        isShowing={isShowing}
        toggle={toggle}
      />
   </div>
  );
};

export default MessagePage;
