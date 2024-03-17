import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { usePostInfo } from '../../graphql/usePost';
import { useGetAllReport } from '../../graphql/useReport';
import useModal from '../../hooks/useModal';
import unixToDateTime from '../../utils/unixToDateTime';
import Loading from '../../utils/useLoading';
import TableReport from './TableReportData';
import './styles.scss';
import React, { Suspense, useCallback, useMemo, useState } from 'react';

const ReportManagement = () => {
  const [action, setAction] = useState('');
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [targetItem, setTargetItem] = useState({});
  const { fetchedData: allReports, isFetching: loading } = useGetAllReport();
  const [username, setUsername] = useState('');
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
      title = `Ban user ${username} with post '${fetchedData?.postInfo.title}'?`;
    } else if (action === 'Reject') {
      title = `Reject report of user ${username} with post '${fetchedData?.postInfo.title}'? `;
    } else title = `Report of user ${username} with post '${fetchedData?.postInfo.title}'`;
    return <span style={{ fontFamily: 'Abhaya Libre' }}>{title}</span>;
  }, [action, fetchedData?.postInfo.title, username]);

  const modalContent = useCallback(() => {
    return (
      <>
        {fetchedData && (
          <div
            key={targetItem.id}
            className="bodyContent"
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '700' }}>Post title:</span>
                <span style={{ fontFamily: 'Abhaya Libre' }}>
                  {fetchedData?.postInfo.title}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '700' }}>Caption:</span>
                <span style={{ fontFamily: 'Abhaya Libre' }}>
                  {fetchedData?.postInfo.caption}
                </span>
              </div>
              {/* <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '700', width: 'fit-content' }}>
                  Created date:
                </span>
                <span style={{ fontFamily: 'Abhaya Libre' }}>
                  {unixToDateTime(fetchedData?.postInfo.createdAt)}
                </span>
              </div> */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontWeight: '700' }}>Reason:</span>
                <span style={{ fontFamily: 'Abhaya Libre' }}>
                  {targetItem?.reason}
                </span>
              </div>
            </div>

            <img
              src={fetchedData?.postInfo.image.url}
              alt=""
              width={200}
              height={200}
            />
          </div>
        )}
      </>
    );
  }, [targetItem, fetchedData]);

  const handleViewDetail = useCallback(
    (item) => {
      console.log({ item });
      setAction('View');
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
  }, [action, toggleModal]);

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
                body={allReports ? allReports.allReports : []}
                handleAccept={handleAccept}
                handleReject={handleReject}
                handleViewDetail={handleViewDetail}
                setUsername={setUsername}
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
            submitText={action}
            hideButton={action === 'View' ? true : false}
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
      action,
    ]
  );
};

export default ReportManagement;
