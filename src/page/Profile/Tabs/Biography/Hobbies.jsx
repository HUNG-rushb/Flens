import ButtonCustom from '../../../../components/Button/ButtonCustom';
import React from 'react';

const HobbyComponent = ({ hobbies, toggleShowModal, setCheckType }) => {
  return (
    <div className="bio-hobbies">
      <div className="hobby-text">
        <span>Hobby:</span>
        <div className="badge-container">
          {hobbies.map((item) => {
            return <div key={item.id}>{item.value}</div>;
          })}
        </div>
      </div>
      <div className="hobby-btn">
        <ButtonCustom
          text={'Add hobby'}
          type="default2"
          onClick={() => [toggleShowModal(), setCheckType(2)]}
        />
      </div>
    </div>
  );
};

export default HobbyComponent;
