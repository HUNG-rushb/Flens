import React from 'react';

const content = [
  {
    id: 1,
    content: 'Copyright infringement',
  },
  {
    id: 2,
    content: 'Offensive content',
  },
  {
    id: 3,
    content: 'Spam',
  },
  {
    id: 4,
    content: 'Mature content',
  },
  {
    id: 5,
    content: 'Harmful content',
  },
];

export const ReportContent = ({ image }) => {
  return (
    <div className="report-photo-container">
      <img src={image} alt="" />
      <div className="right-report-photo">
        <span>Report this photo with reason:</span>
        <ul>
          {content.map((item) => {
            return (
              <div key={item.id}>
                <li>
                  <input type="checkbox" /> <span>{item.content}</span>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
