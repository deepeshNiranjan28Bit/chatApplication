import React from 'react';
import { Loader } from 'rsuite';
import { useParams } from 'react-router';
import { useRooms } from '../../context/rooms.context';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/top';
import ChatBottom from '../../components/chat-window/bottom';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transfromToArr } from '../../misc/helpers';
import { auth } from '../../misc/firebase';

function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currRoom = rooms.find(room => room.id === chatId);

  if (!currRoom) {
    return <h6 className="text-center mt-page">ChatId {chatId} not found.</h6>;
  }

  const { name, description } = currRoom;

  const admins = transfromToArr(currRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
}

export default Chat;
