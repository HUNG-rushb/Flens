import { useAuthState } from '../../context/AuthContext';
import ChatApp from 'chat/ChatApp';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2

const MessageChatApp = () => {
  const { id: currentUserId } = useAuthState();
  const location = useLocation();
  const anotherUser = location?.state?.userId ? location.state.userId : '';
  const isNewChat = location?.state?.isNewChat ? location.state.isNewChat : '';

  console.log(
    { currentUserId, anotherUser, isNewChat },
    'in message page of flens'
  );

  // const [time, setTime] = useState(new Date());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  // console.log({ time });

  return (
    <ChatApp userId={currentUserId} anotherUser={{ anotherUser, isNewChat }} />
  );
  // return <p>ok</p>;
};

export default MessageChatApp;
