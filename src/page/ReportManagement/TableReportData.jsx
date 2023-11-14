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
  body,
  handleAccept,
  Check,
  handleReject,
  X,
}) => {
  const navigate = useNavigate();
  console.log(body)

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
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.userId}</td>
                <td>{item.userReported}</td>
                <td>{unixToDateTime(item.createdAt)}</td>
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
    [body, handleAccept, handleReject]
  );
};

export default TableReportManagement;
