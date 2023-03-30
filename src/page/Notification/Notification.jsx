import Avatar from '../../assets/images/avatar.jpg';
import ButtonCustom from '../../components/Button/ButtonCustom';
import Page from '../../components/utils/Page';
import './Notification.scss';
import React, { Suspense } from 'react';

const Notification = () => {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <Page title={'Flens-Notification'}>
      <Suspense fallback={null}>
        <div className="Notifi-page">
          <div className="left-content">
            <img src={Avatar} alt="avatar"></img>
            <div className="name">Nguyen Van A</div>
            <div className="skill-content">
              <div>
                <span>Your Flens link:</span> flens.com/quocthanhh
              </div>
              <div>
                <span>Favourites:</span> Camera, Portrait
              </div>
              <div>
                <span>Skills:</span> Portrait photography
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="title">Notifications</div>
            <div className="notifi-content">
              <div className="noti-card">
                <div className="upper-content">
                  <img src={Avatar} alt="images" width={80}  />
                  <div className="card-content">
                    <div className="name">
                      <span>Thomas</span> Followed you
                    </div>
                    <div>2 minutes ago</div>
                  </div>
                  <div className="button-follow-back">
                  <ButtonCustom
                    text={'Follow back'}
                    type="default2"
                    onClick={handleClick}
                  />
                  </div>
                  
                </div>
                <div className="below-content">
                  Both following Jane, Bobs and 35 others
                </div>
              </div><div className="noti-card">
                <div className="upper-content">
                  <img src={Avatar} alt="images" width={80}  />
                  <div className="card-content">
                    <div className="name">
                      <span>Thomas</span> Followed you
                    </div>
                    <div>2 minutes ago</div>
                  </div>
                  <div className="button-follow-back">
                  <ButtonCustom
                    text={'Follow back'}
                    type="default2"
                    onClick={handleClick}
                  />
                  </div>
                  
                </div>
                <div className="below-content">
                  Both following Jane, Bobs and 35 others
                </div>
              </div>  
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Notification;
