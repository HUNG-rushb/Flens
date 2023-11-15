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
  console.log(body);

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
              <tr key={item.id} onClick={() => handleViewDetail(item)}>
                <td>{index + 1}</td>
                {/* <td>{item.userId}</td> */}
                <td>
                  <img
                    src="https://via.placeholder.com/40x40"
                    alt=""
                    width={40}
                    height={40}
                  />{' '}
                  reporter name
                </td>
                {/* <td>{item.userReported}</td> */}
                <td>
                  <img
                    src="https://via.placeholder.com/40x40"
                    alt=""
                    width={40}
                    height={40}
                  />{' '}
                  reported name
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
                      onClick={() => handleAccept(item)}
                    />

                    <X
                      id="remove-icon"
                      color="red"
                      size={30}
                      onClick={() => handleReject(item)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    ),
    [body, handleAccept, handleReject, handleViewDetail]
  );
};

export default TableReportManagement;
