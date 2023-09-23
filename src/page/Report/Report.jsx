import ModalCustom from '../../components/Modal/ModalCustom.jsx';
import Page from '../../components/utils/Page.js';
import './Report.css';
import TableReportData from './TableReportData.jsx';
import React, { Suspense, useCallback, useState } from 'react';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';

const Report = () => {

  const [data, setData] = useState([
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
  ]);

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [tempObj, setTempObj] = useState({});

  const handleClose = useCallback(() => {
    showAcceptModal ? setShowAcceptModal(false) : setShowRejectModal(false);
  },[showAcceptModal]);

  const modalAcceptContent = () => {
    return (
      <div key={tempObj.id} className="bodyContent">
        <div>
          <span>Link: </span>
          {tempObj.link}
        </div>
        <div>
          <span>Reason:</span> {tempObj.reason}
        </div>
        <div>
          <span>Reporter: </span>
          {tempObj.reporter}
        </div>
      </div>
    );
  };

  const handleClickAccept = (item) => {
    setTempObj(item);
    setShowAcceptModal(true);
  };

  const handleClickReject = (item) => {
    setTempObj(item);
    setShowRejectModal(true);
  };

  const handleSubmitModal = () => {
    setData(data.filter((item) => item !== tempObj));
    showAcceptModal ? setShowAcceptModal(false) : setShowRejectModal(false);
  };

  return (
    <Page title={'Flens-Reports'}>
      <Suspense fallback={null}>
        <div className="report-page">
          <div className="title">Report Management</div>
          <div className="body-page">
            <TableReportData
              body={data}
              handleClickAccept={handleClickAccept}
              Check={CheckSquare}
              handleClickReject={handleClickReject}
              X={XSquare}
            />
            <ModalCustom
              show={showAcceptModal ? showAcceptModal : showRejectModal}
              handleClose={handleClose}
              modalTitle={
                showAcceptModal
                  ? `ban user "${tempObj.name}" witd id ${tempObj.id}?`
                  : `Reject report id ${tempObj.id}`
              }
              modalContent={
                showAcceptModal
                  ? modalAcceptContent()
                  : 'This report will be removed, please be carefull with your decision'
              }
              handleSavechanges={handleSubmitModal}
              size={'md'}
              confirmButtonMessage="Submit"
            />
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Report;
