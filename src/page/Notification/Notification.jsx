import Avatar from '../../assets/images/avatar.jpg';
import ButtonCustom from '../../components/Button/ButtonCustom';
import Page from '../../components/utils/Page';
import './Notification.css';
import React, { Suspense } from 'react';
import { HeartFill, ReplyFill } from 'react-bootstrap-icons';

const Notification = () => {
  const handleClick = () => {
    console.log('click');
  };

  const notifi_data = [
    {
      id: 1,
      avatar: Avatar,
      name: 'Thomas',
      type: 1,
      time: '2 minutes ago',
    },
    {
      id: 2,
      avatar: Avatar,
      name: 'Thomas',
      type: 2,
      time: '3 minutes ago',
    },
    {
      id: 3,
      avatar: Avatar,
      name: 'Thomas',
      type: 3,
      time: '5 minutes ago',
    },
  ];
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
              {notifi_data.map(item => {
                if (item.type === 1)
                  return (
                    <div className="noti-card" key={item.id}>
                      <div className="upper-content">
                        <img src={item.avatar} alt="images" width={80} />
                        <div className="card-content">
                          <div className="name">
                            <span>{item.name}</span> Followed you
                          </div>
                          <div>{item.time}</div>
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
                  );
                else if (item.type === 2)
                  return (
                    <div className="noti-card" key={item.id}>
                      <div className="upper-content">
                        <img src={item.avatar} alt="images" width={80} />
                        <div className="card-content">
                          <div className="name-2">
                            <span>{item.name}</span> Liked{' '}
                            {<HeartFill color="red" />} your post.
                          </div>
                          <div>{item.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                else if (item.type === 3)
                  return (
                    <div className="noti-card" key={item.id}>
                      <div className="upper-content">
                        <img src={item.avatar} alt="images" width={80} />
                        <div className="card-content">
                          <div className="name-2">
                            <span>{item.name}</span> Shared{' '}
                            {<ReplyFill color="blue" size={28} />} your post.
                          </div>
                          <div>{item.time}</div>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Notification;
