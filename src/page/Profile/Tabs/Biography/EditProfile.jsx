import CoverImage from '../../../../assets/images/Profile/profileCoverImage.jpg';
import Avatar from '../../../../assets/images/avatar.jpg';
import Button from '../../../../components/Button/ButtonCustom';
import './EditProfile.css';
import React from 'react';

const EditProfile = () => {
  const handleSaveEdit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="edit-profile-page">
      <div className="above-content">
        <div className="change-avatar">
          <img src={Avatar} alt="edit-avatar" />
          <div>
            <Button text={'Change avatar image'} type="default3" />
          </div>
        </div>
        <div className="change-cover-image">
          <img src={CoverImage} alt="edit-cover" width={'400px'} />
          <div>
            <Button text={'Change cover image'} type="default3" />
          </div>
        </div>
      </div>
      <form className="below-edit-content">
        <div>
          <label>Name</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Phone Number</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Birthday</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <label>Camera</label>
          <div>
            <input type="text" name="" />
          </div>
        </div>
        <div>
          <Button
            text={'Save changes'}
            type="save-change-edit"
            onClick={(e) => handleSaveEdit(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
