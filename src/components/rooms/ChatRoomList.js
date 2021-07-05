import React from 'react';
import RoomItem from './RoomItem';
import { Nav } from 'rsuite';

function ChatRoomList({ aboveHeight }) {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveHeight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
}

export default ChatRoomList;
