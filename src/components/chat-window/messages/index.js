import React, { useCallback, useEffect, useState } from 'react';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';
import { useParams } from 'react-router';
import { auth, database } from '../../../misc/firebase';
import { transfromToArrWithId } from '../../../misc/helpers';

function Messages() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transfromToArrWithId(snap.val());
        setMessages(data);
      });
    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alert;
      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alert = 'Access taken';
          } else {
            admins[uid] = true;
            alert = 'Access granted';
          }
        }
        return admins;
      });
      Alert.info(alert, 4000);
    },
    [chatId]
  );

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);
    let alert;
    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alert = 'Like Removed';
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alert = 'Like Added';
        }
      }
      return msg;
    });
    Alert.info(alert, 4000);
  }, []);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet.</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
          />
        ))}
    </ul>
  );
}

export default Messages;
