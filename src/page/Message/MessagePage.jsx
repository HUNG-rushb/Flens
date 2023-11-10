import { useAuthState } from '../../context/AuthContext';
import './Message.css';
// import { ChatApp } from 'chat/ChatApp';
import React, { useState, useEffect, useRef } from 'react';

// https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2

const MessageChatApp = () => {
  const { id: userId } = useAuthState();

  // return <ChatApp userId={userId} />;
  return <p>chat</p>;
};

export default MessageChatApp;
