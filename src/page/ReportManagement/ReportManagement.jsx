import Modal from '../../components/Modal/ModalCustom.jsx';
import Page from '../../components/utils/Page.js';
import useModal from '../../hooks/useModal.jsx';
import './ReportManagement.scss';
import TableReportData from './TableReportData.jsx';
import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';

const ReportManagement = () => {
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

  const { isShowing: showAcceptReport, toggle: toggleAcceptReport } =
    useModal();
  const { isShowing: showRejectReport, toggle: toggleRejectReport } =
    useModal();
  const [targetItem, settargetItem] = useState({});

  const acceptReportTitle = useMemo(() => {
    return `ban user "${targetItem.name}" witd id ${targetItem.id}?`;
  }, [targetItem]);

  const rejectReportTitle = useMemo(() => {
    return `Reject report id ${targetItem.id}`;
  }, [targetItem]);

  const acceptReportContent = useMemo(() => {
    return (
      <div key={targetItem.id} className="bodyContent">
        <div>
          <span>Link: </span>
          {targetItem.link}
        </div>
        <div>
          <span>Reason:</span> {targetItem.reason}
        </div>
        <div>
          <span>Reporter: </span>
          {targetItem.reporter}
        </div>
      </div>
    );
  }, [targetItem]);

  const rejectReportContent = useMemo(() => {
    return 'This report will be removed, please be carefull with your decision';
  }, []);

  const handleAcceptReport = useCallback(
    (item) => {
      settargetItem(item);
      toggleAcceptReport(true);
    },
    [toggleAcceptReport]
  );

  const handleRejectReport = useCallback(
    (item) => {
      settargetItem(item);
      toggleRejectReport(true);
    },
    [toggleRejectReport]
  );

  const handleClose = useCallback(() => {
    showAcceptReport ? toggleAcceptReport(false) : toggleRejectReport(false);
  }, [showAcceptReport, toggleAcceptReport, toggleRejectReport]);

  const handleSubmit = useCallback(() => {
    setData(data.filter((item) => item !== targetItem));
    showAcceptReport ? toggleAcceptReport(false) : toggleRejectReport(false);
  }, [data, targetItem, showAcceptReport, toggleAcceptReport, toggleRejectReport]);

  return useMemo(
    () => (
      <Page title={'Flens-Reports'}>
        <Suspense fallback={null}>
          <div className="report-page">
            <div className="title">Report Management</div>
            <div className="body-page">
              <TableReportData
                body={data}
                handleClickAccept={handleAcceptReport}
                Check={CheckSquare}
                handleClickReject={handleRejectReport}
                X={XSquare}
              />
            </div>
          </div>
          <Modal
            show={showAcceptReport ? showAcceptReport : showRejectReport}
            handleClose={handleClose}
            modalTitle={
              showAcceptReport ? acceptReportTitle : rejectReportTitle
            }
            modalContent={
              showAcceptReport ? acceptReportContent : rejectReportContent
            }
            handleSavechanges={handleSubmit}
            size={'md'}
            confirmButtonMessage="Submit"
          />
        </Suspense>
      </Page>
    ),
    [
      data,
      showAcceptReport,
      showRejectReport,
      acceptReportTitle,
      rejectReportTitle,
      acceptReportContent,
      rejectReportContent,
      handleAcceptReport,
      handleRejectReport,
      handleClose,
      handleSubmit,
    ]
  );
};

export default ReportManagement;
