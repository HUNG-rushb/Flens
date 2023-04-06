import ModalCustom from '../../components/Modal/Modal.jsx';
import Page from '../../components/utils/Page.js';
import './Report.css';
import React, { Suspense, useState } from 'react';
import { Check, X } from 'react-bootstrap-icons';

const Report = () => {
  const table_report_data = [
    {
      id: 1,
      name: 'Nguyen Van A',
      link: 'https://flens.com/nguyenvana',
      time: 'Thus 23:40',
      reason: 'Upload content containing violent, offensive.',
      reporter: 'Nguyen Van B',
    },
    {
      id: 2,
      name: 'Nguyen Van B',
      link: 'https://flens.com/nguyenvanb',
      time: 'Fri 23:40',
      reason: 'Comment with offensive content.',
      reporter: 'Nguyen Van A',
    },
    {
      id: 3,
      name: 'Nguyen Van A',
      link: 'https://flens.com/nguyenvana',
      time: 'Thus 23:40',
      reason: 'Upload content containing violent, offensive.',
      reporter: 'Nguyen Van B',
    },
    {
      id: 4,
      name: 'Nguyen Van B',
      link: 'https://flens.com/nguyenvanb',
      time: 'Fri 23:40',
      reason: 'Comment with offensive content.',
      reporter: 'Nguyen Van A',
    },
  ];

  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleClickAccept = (e) => {
    e.preventDefault();
    setShowAcceptModal(true);
  };

  const handleClose = () => {
    setShowAcceptModal(false);
  };

  const modalAcceptContent = ({ item }) => {
    return (
      <div key={item.id}>
        <div>
          <span>Link:{item.link}</span>
        </div>
        <div>
          <span>Reason:{item.reason}</span>
        </div>
        <div>
          <span>Reporter:{item.reporter}</span>
        </div>
      </div>
    );
  };

  return (
    <Page title={'Flens-Reports'}>
      <Suspense fallback={null}>
        <div className="report-page">
          <div className="title-page">Report Management</div>
          <div className="body-page">
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>Name</td>
                  <td>Time</td>
                  <td>Reason</td>
                  <td>Reporter</td>
                  <td>Actions</td>
                </tr> 
              </thead>
              <tbody>
                {table_report_data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.time}</td>
                      <td>{item.reason}</td>
                      <td>{item.reporter}</td>
                      <td className="buttons">
                        <button onClick={handleClickAccept} key={item.id}>
                          <Check color="white" size={25} />
                        </button>
                        <ModalCustom
                          show={showAcceptModal}
                          handleClose={handleClose}
                          modalTitle={`ban user "${item.name}" witd id ${item.id}?`}
                          modalContent={modalAcceptContent((item = { item }))}
                          size={'md'}
                        ></ModalCustom>
                        <button className="x-btn">
                          <X color="white" size={25} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Report;
