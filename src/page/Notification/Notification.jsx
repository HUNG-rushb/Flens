import Avatar from '../../assets/images/avatar.jpg';
import ButtonCustom from '../../components/Button/ButtonCustom';
import Page from '../../components/utils/Page';
import LeftContent from './LeftContent.jsx';
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
      name: 'Tom',
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
      name: 'John',
      type: 3,
      time: '5 minutes ago',
    },
  ];
  return (
    <Page title={'Flens-Notification'}>
      <Suspense fallback={null}>
        <div className="Notifi-page">
          <LeftContent />
          <div className="right-content">
            <div className="title">Notifications</div>

            <div className="notifi-content">
              {notifi_data.map((item) => {
                return (
                  <div className="noti-card" key={item.id}>
                    <div className="upper-content">
                      <img src={item.avatar} alt="images" width={80} />
                      <div className="card-content">
                        {item.type === 1 ? (
                          <div className="name">
                            <span>{item.name}</span> Followed you.
                          </div>
                        ) : (
                          <div className="name">
                            <span>{item.name}</span>{' '}
                            {item.type === 2 ? (
                              <>
                                Liked <HeartFill color="red" size={25} /> your
                                post.{' '}
                              </>
                            ) : (
                              <>
                                Shared{' '}
                                <ReplyFill
                                  color="blue"
                                  size={28}
                                  className="mb-1"
                                />{' '}
                                your post.
                              </>
                            )}
                          </div>
                        )}
                        <div>{item.time}</div>
                      </div>
                      {item.type === 1 ? (
                        <div className="button-follow-back">
                          <ButtonCustom
                            text={'Follow back'}
                            type="default2"
                            onClick={handleClick}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {item.type === 1 ? (
                      <div className="below-content">
                        Both following Jane, Bobs and 35 others
                      </div>
                    ) : (
                      <></>
                    )}
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
