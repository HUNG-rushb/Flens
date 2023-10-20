import Button from '../../../../components/Button/Button';
import React, { useMemo } from 'react';
import './styles.scss';

const Hobbies = ({ hobbies, toggleShowModal, setCheckType }) => {
  return useMemo(
    () => (
      <div className="hobbies">
        <div className="hobby-text">
          <span>Hobby:</span>
          <div className="badge-wrapper">
            {hobbies.map((item) => {
              return <div key={item.id}>{item.value}</div>;
            })}
          </div>
        </div>
        <div className="add-button">
          <Button
            text="Add hobby"
            type="default2"
            onClick={() => [toggleShowModal(), setCheckType(2)]}
          />
        </div>
      </div>
    ),
    [hobbies, setCheckType, toggleShowModal]
  );
};

export default Hobbies;
