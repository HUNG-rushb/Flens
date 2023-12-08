import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { usePostInfo } from '../../graphql/usePost';
import { useGetAllReport } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import Loading from '../../utils/useLoading';
import TableReport from './TableReportData';
import './styles.scss';
import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';

const ReportManagement = () => {
  const [action, setAction] = useState('');
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [targetItem, setTargetItem] = useState({});
  console.log({ targetItem });
  const { fetchedData: allReports, isFetching: loading } = useGetAllReport();
  // console.log({ allReports });

  const { fetchedData } = usePostInfo({
    postInfoData: {
      postId: targetItem.postId
        ? targetItem.postId
        : '000000000000000000000000',
    },
  });
  console.log({ fetchedData });

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
        <>
          {fetchedData && (
            <div key={targetItem.id} className="bodyContent">
              <div>
                <span>Link: </span>
                {targetItem.link}
              </div>

              <div>
                <span>Reason:</span> {targetItem.reason}
              </div>

              <img
                src={fetchedData.postInfo.image.url}
                alt=""
                width={40}
                height={40}
              />
            </div>
          )}
        </>
      );
    } else if (action === 'Reject') {
      return 'This report will be removed, please be carefull with your decision';
    } else
      return (
        <>
          {fetchedData && (
            <div key={targetItem.id} className="bodyContent">
              <div>
                <span>User:</span> {targetItem.userId}
              </div>
              <div>
                <span>Link: </span>
                {targetItem.link}
              </div>

              <div>
                <span>Report with reason:</span> {targetItem.reason}
              </div>

              <img
                src={fetchedData.postInfo.image.url}
                alt=""
                width={40}
                height={40}
              />
            </div>
          )}
        </>
      );
  }, [action, targetItem, fetchedData]);

  const handleViewDetail = useCallback(
    (item) => {
      console.log({ item });
      setAction('view');
      setTargetItem(item);
      toggleModal();
    },
    [toggleModal]
  );

  const handleAccept = useCallback(
    (item) => {
      setAction('Accept');
      setTargetItem(item);
      toggleModal();
    },
    [setAction, toggleModal]
  );

  const handleReject = useCallback(
    (item) => {
      setAction('Reject');
      setTargetItem(item);
      toggleModal();
    },
    [setAction, toggleModal]
  );

  const handleSubmit = useCallback(() => {
    if (action === 'Accept') {
      toggleModal();
    } else if (action === 'Reject') {
      toggleModal();
    } else {
      toggleModal();
    }
  }, [action, targetItem, toggleModal]);

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
