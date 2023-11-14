import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useGetAllReport } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import TableReportData from './TableReportData';
import './styles.scss';
import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';

const ReportManagement = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Nguyen Van A',
      link: 'https://flens.com/nguyenvana',
      time: 'Thus 23:40',
      linkPost: 'https://link-post',
      reason: 'Upload content containing violent, offensive.',
      reporter: 'Nguyen Van B',
    },
    {
      id: 2,
      name: 'Nguyen Van B',
      link: 'https://flens.com/nguyenvanb',
      time: 'Fri 23:40',
      linkPost: 'https://link-post',
      reason: 'Comment with offensive content.',
      reporter: 'Nguyen Van A',
    },
    {
      id: 3,
      name: 'Nguyen Van A',
      link: 'https://flens.com/nguyenvana',
      time: 'Thus 23:40',
      linkPost: 'https://link-post',
      reason: 'Upload content containing violent, offensive.',
      reporter: 'Nguyen Van B',
    },
    {
      id: 4,
      name: 'Nguyen Van B',
      link: 'https://flens.com/nguyenvanb',
      time: 'Fri 23:40',
      linkPost: 'https://link-post',
      reason: 'Comment with offensive content.',
      reporter: 'Nguyen Van A',
    },
  ]);

  const [action, setAction] = useState('');
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [targetItem, settargetItem] = useState({});
  const { fetchedData: allReports } = useGetAllReport();
  console.log({ allReports });

  const modalTitle = useMemo(() => {
    return action === 'Accept'
      ? `ban user "${targetItem.name}" witd id ${targetItem.id}?`
      : `Reject report id ${targetItem.id}`;
  }, [action, targetItem.id, targetItem.name]);

  const modalContent = useCallback(() => {
    return action === 'Accept' ? (
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
    ) : (
      'This report will be removed, please be carefull with your decision'
    );
  }, [
    action,
    targetItem.id,
    targetItem.link,
    targetItem.reason,
    targetItem.reporter,
  ]);

  const handleAccept = useCallback(
    (item) => {
      setAction('Accept');
      settargetItem(item);
      toggleModal();
    },
    [setAction, toggleModal]
  );

  const handleReject = useCallback(
    (item) => {
      setAction('Reject');
      settargetItem(item);
      toggleModal();
    },
    [setAction, toggleModal]
  );

  const handleSubmit = useCallback(() => {
    if (action === 'Accept') {
      setData(data.filter((item) => item !== targetItem));
      toggleModal();
    } else {
      setData(data.filter((item) => item !== targetItem));
      toggleModal();
    }
  }, [action, data, targetItem, toggleModal]);

  const handleClose = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  return useMemo(
    () => (
      <Page title="Flens-Report management">
        <Suspense fallback={null}>
          <div className="report-management">
            <div className="title">Report Management</div>
            <div className="body-page">
              <TableReportData
                body={allReports ? allReports.allReports : []}
                handleAccept={handleAccept}
                Check={CheckSquare}
                handleReject={handleReject}
                X={XSquare}
              />
            </div>
          </div>
          <Modal
            size="md"
            show={showModal}
            modalTitle={modalTitle}
            modalContent={modalContent()}
            handleSavechanges={handleSubmit}
            handleClose={handleClose}
            confirmButtonMessage="Submit"
          />
        </Suspense>
      </Page>
    ),
    [
      handleAccept,
      handleReject,
      showModal,
      modalTitle,
      modalContent,
      handleClose,
      handleSubmit,
      allReports,
    ]
  );
};

export default ReportManagement;
