import ModalCustom from '../../components/Modal/Modal.jsx';
import Page from '../../components/utils/Page.js';
import React, { Suspense, useState } from 'react';

const MessagePage = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const modalContent = () => {
    return <p>Body modal content</p>
  }

  return (
    <Page title="Flens-Message">
      <Suspense fallback={null}>
        <div className="message-page">
          Message
          <button type="submit" onClick={handleShow}>
            Test Modal
          </button>
          <ModalCustom
            show={show}
            handleclick={handleShow}
            handleClose={handleClose}
            titleText="Title Modal"
            modalContent={modalContent()}
            size="md"
          />
        </div>
      </Suspense>
    </Page>
  );
};

export default MessagePage;
