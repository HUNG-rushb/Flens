import React, { useMemo } from 'react';

const table_title = ['No', 'Name', 'Time', 'Reason', 'Reporter', '#', '#'];

const TableReportManagement = ({
  body,
  handleClickAccept,
  Check,
  handleClickReject,
  X,
}) => {
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
                <td>{item.name}</td>
                <td>{item.time}</td>
                <td>{item.reason}</td>
                <td>{item.reporter}</td>
                <td>
                  <Check
                    id="check-icon"
                    color="blue"
                    size={30}
                    onClick={() => handleClickAccept(item)}
                  />
                </td>
                <td>
                  <X
                    id="remove-icon"
                    color="red"
                    size={30}
                    onClick={() => handleClickReject(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ),
    [body, handleClickAccept, handleClickReject]
  );
};

export default TableReportManagement;
