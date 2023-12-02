import Button from '../../../../components/Button/Button';
import './styles.scss';
import React, { useMemo } from 'react';

const Hobbies = ({ hobbies, toggleShowModal }) => {
  return useMemo(
    () => (
      <div className="hobbies">
        <div className="hobby-text">
          <span>Interest:</span>
          <div className="badge-wrapper">
            {hobbies.userInfo.interestCategories.length === 0 ? (
              <p>Please add some interests</p>
            ) : (
              hobbies.userInfo.interestCategories.map((item) => {
                return <div key={item.id}>{item.value}</div>;
              })
            )}
          </div>
        </div>

        <div className="add-button">
          <Button
            text="Add hobby"
            type="default2"
            onClick={() => toggleShowModal()}
          />
        </div>
      </div>
    ),
    [hobbies, toggleShowModal]
  );
};

export default Hobbies;
