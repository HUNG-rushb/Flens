import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useGetAllReport } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';
import TableReport from './TableReportData';
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
  const { fetchedData: allReports, isFetching: loading } = useGetAllReport();
  console.log({ allReports });

  const modalTitle = useMemo(() => {
    let title = '';
    if (action === 'Accept') {
      title = `ban user "${targetItem.name}" witd id ${targetItem.id}?`;
    } else if (action === 'Reject') {
      title = `Reject report id ${targetItem.id}`;
    } else title = `Report id ${targetItem.id}`;
    return title;
  }, [action, targetItem.id, targetItem.name]);

  const modalContent = useCallback(() => {
    if (action === 'Accept') {
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
    } else if (action === 'Reject') {
      return 'This report will be removed, please be carefull with your decision';
    } else
      return (
        <div key={targetItem.id} className="bodyContent">
          <div>
            <span>User:</span>{' '}
            {targetItem.userId}
          </div>
          <div>
            <span>Link: </span>
            {targetItem.link}
          </div>
          <div>
            <span>Report with reason:</span> {targetItem.reason}
          </div>
          <div>
            <span>Reporter: </span>
            {targetItem.reporter}
          </div>
        </div>
      );
  }, [
    action,
    targetItem.id,
    targetItem.link,
    targetItem.reason,
    targetItem.reporter,
    targetItem.userId,
  ]);

  const handleViewDetail = useCallback(
    (item) => {
      setAction('view');
      settargetItem(item);
      toggleModal();
    },
    [toggleModal]
  );

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
    } else if (action === 'Reject') {
      setData(data.filter((item) => item !== targetItem));
      toggleModal();
    } else {
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
          <div className="report-management-container">
            <div className="title">Report Management</div>
            <div className="content-wrapper">
              <TableReport
                X={XSquare}
                Check={CheckSquare}
                body={allReports ? allReports.allReports : []}
                handleAccept={handleAccept}
                handleReject={handleReject}
                handleViewDetail={handleViewDetail}
              />
            </div>
          </div>
          <Loading loading={loading} />
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
      allReports,
      handleAccept,
      handleReject,
      handleViewDetail,
      loading,
      showModal,
      modalTitle,
      modalContent,
      handleSubmit,
      handleClose,
    ]
  );
};

export default ReportManagement;
