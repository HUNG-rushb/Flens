import React, { useEffect, useMemo, useState } from 'react';

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

export const ReportContent = ({ image, setImageToReport = () => {} }) => {
  const [reason, setReason] = useState('Copyright infringement');
  console.log({ reason });

  useEffect(() => {
    setImageToReport((prev) => ({
      ...prev,
      reason,
    }));
  }, [reason]);

  return useMemo(
    () => (
      <div className="report-photo-container">
        <img src={image} alt="" />

        <div className="right-report-photo">
          <span>Report this photo with reason:</span>

          <ul>
            {content.map((item) => {
              return (
                <div key={item.id}>
                  <li>
                    <input
                      type="radio"
                      checked={reason === item.content}
                      onChange={() => {
                        setReason(item.content);
                      }}
                    />
                    <span>{item.content}</span>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    ),
    [image, reason]
  );
};
