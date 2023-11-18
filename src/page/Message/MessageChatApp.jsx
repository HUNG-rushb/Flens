import { useAuthState } from '../../context/AuthContext';
import { useGetAllChatCurrentUser } from '../../graphql/useUser';
import ChatApp from 'chat/ChatApp';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2
const MessageChatApp = ({ route }) => {
  const location = useLocation();
  console.log(location?.state?.userId, 'in message page of flens');
  const anotherUser = location?.state.userId ? location.state.userId : '';

  const { id: currentUserId } = useAuthState();
  const { fetchedData: isChatExisted, isNewChat } = useGetAllChatCurrentUser({
    chatInfoByUserIdData: {
      userIDs: [
        currentUserId,
        anotherUser === '' ? '000000000000000000000000' : anotherUser,
      ],
    },
  });
  // console.log({ isChatExisted });
  // console.log({ isNewChat });

  return (
    <ChatApp userId={currentUserId} anotherUser={{ anotherUser, isNewChat }} />
  );
  // return <p>ok</p>;
};

export default MessageChatApp;
