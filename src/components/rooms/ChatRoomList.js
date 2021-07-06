import React from 'react';
import RoomItem from './RoomItem';
import { Nav, Loader } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import { Link, useLocation } from 'react-router-dom';

function ChatRoomList({ aboveHeight }) {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" size="md" speed="slow" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            key={room.id}
            componentClass={Link}
            to={`/chats/${room.id}`}
            eventKey={`/chats/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
}

export default ChatRoomList;
