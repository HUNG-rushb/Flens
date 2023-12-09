import { useUserProfileImageReport } from '../../graphql/useUser';
import unixToDateTime from '../../utils/unixToDateTime';
import React, { useEffect, useMemo } from 'react';
import { CheckSquare, XSquare, InfoSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const table_title = [
  'No',
  'Reporter',
  'User',
  'Time',
  'Reason',
  'Status',
  'Action',
];

const TableReportManagement = ({
  body,
  handleAccept,
  handleReject,
  handleViewDetail,
  setUsername,
}) => {
  const navigate = useNavigate();

  return useMemo(
    () => (
      <table>
        <thead>
          <tr>
            {table_title.map((value, index) => {
              return <td key={index}>{value}</td>;
            })}
          </tr>
        </thead>

        <tbody> 
          {body.map((item, index) => {
            return (
              <ReportCard
                key={item.id}
                item={item}
                index={index}
                handleViewDetail={handleViewDetail}
                handleAccept={handleAccept}
                handleReject={handleReject}
                setUsername={setUsername}
              />
            );
          })}
        </tbody>
      </table>
    ),
    [body, handleAccept, handleReject, handleViewDetail, setUsername]
  );
};

const ReportCard = ({
  item,
  index,
  handleViewDetail,
  handleAccept,
  handleReject,
  setUsername  
}) => {
  // console.log({ item });

  const { fetchedData: user } = useUserProfileImageReport({
    userInfoData: { userId: item.userId },
  });
  const { fetchedData: userReported } = useUserProfileImageReport({
    userInfoData: { userId: item.userReported },
  });

  // console.log({ user });
  // console.log({ userReported });
  useEffect(() => {
    setUsername(user?.userInfo.name);
  }, [setUsername, user?.userInfo.name]);

  return useMemo(
    () => (
      <>
        {user && userReported && (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <img
                src={userReported.userInfo.profileImageURL}
                alt=""
                width={40}
                height={40}
              />
              {userReported.userInfo.name}
            </td>
            <td>
              <img
                src={user.userInfo.profileImageURL}
                alt=""
                width={40}
                height={40}
              />{' '}
              {user.userInfo.name}
            </td>

            <td>{unixToDateTime(item.createdAt, true)}</td>

            <td>{item.reason}</td>
            <td>{item.isFinished ? 'Done' : 'To be decided'}</td>

            {item.isFinished ? (
              <td></td>
            ) : (
              <td>
                <InfoSquare
                  id="detail-icon"
                  color="#f08080"
                  size={30}
                  onClick={() => handleViewDetail(item)}
                />
                <CheckSquare
                  id="check-icon"
                  color="blue"
                  size={30}
                  onClick={() => handleAccept(item)}
                />

                <XSquare
                  id="remove-icon"
                  color="red"
                  size={30}
                  onClick={() => handleReject(item)}
                />
              </td>
            )}
          </tr>
        )}
      </>
    ),
    [
      handleAccept,
      handleReject,
      handleViewDetail,
      index,
      item,
      user,
      userReported,
    ]
  );
};

export default TableReportManagement;
