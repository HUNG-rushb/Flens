import { useAuthState } from '../../context/AuthContext';
// import ChatApp from 'chat/ChatApp';
import React from 'react';

// https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2
const MessageChatApp = ({ route }) => {
  // const { itemId, otherParam } = route.params;
  const { id } = useAuthState();
  return <ChatApp userId={id} />;
};

export default MessageChatApp;
