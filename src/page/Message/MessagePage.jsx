import { useAuthState } from '../../context/AuthContext';
import './Message.css';
// import { ChatApp } from 'chatApp/ChatApp';
import React, { useState, useEffect, useRef } from 'react';

// https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2

// import chatApp

const MessageChatApp = () => {
  const { id: userId } = useAuthState();

  // return <ChatApp userId={userId} />;
};

export default MessageChatApp;
