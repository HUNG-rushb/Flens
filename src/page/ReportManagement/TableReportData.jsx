import { useUserProfileImageReport } from '../../graphql/useUser';
import unixToDateTime from '../../utils/unixToDateTime';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

const table_title = [
  'No',
  'Reporter',
  'User',
  'Time',
  'Link',
  'Reason',
  'Status',
  'Action',
];

const TableReportManagement = ({
  X,
  body,
  Check,
  handleAccept,
  handleReject,
  handleViewDetail,
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
                onClick={() => handleViewDetail(item)}
                handleViewDetail={handleViewDetail}
                Check={Check}
                X={X}
              />
            );
          })}
        </tbody>
      </table>
    ),
    [body, handleAccept, handleReject, handleViewDetail]
  );
};

const ReportCard = ({ item, index, handleViewDetail, Check, X }) => {
  // console.log({ item });

  const { fetchedData: user } = useUserProfileImageReport({
    userInfoData: { userId: item.userId },
  });
  const { fetchedData: userReported } = useUserProfileImageReport({
    userInfoData: { userId: item.userReported },
  });

  // console.log({ user });
  // console.log({ userReported });

  return useMemo(
    () => (
      <>
        {user && userReported && (
          <tr key={item.id} onClick={() => handleViewDetail(item)}>
            <td>{index + 1}</td>
            {/* <td>{item.userId}</td> */}
            <td>
              <img
                src={userReported.userInfo.profileImageURL}
                alt=""
                width={40}
                height={40}
              />{' '}
              {userReported.userInfo.name}
            </td>
            {/* <td>{item.userReported}</td> */}
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

            <td>{item.postId}</td>
            <td>{item.reason}</td>
            <td>{item.isFinished ? 'Done' : 'To be decided'}</td>

            {item.isFinished ? (
              <td></td>
            ) : (
              <td>
                <Check
                  id="check-icon"
                  color="blue"
                  size={30}
                  // onClick={() => handleAccept(item)}
                />

                <X
                  id="remove-icon"
                  color="red"
                  size={30}
                  // onClick={() => handleReject(item)}
                />
              </td>
            )}
          </tr>
        )}
      </>
    ),
    [user, userReported]
  );
};

export default TableReportManagement;
