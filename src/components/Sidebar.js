import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import ChatRoomList from './rooms/ChatRoomList';

function Sidebar() {
  const topSideBarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSideBarRef.current) {
      setHeight(topSideBarRef.current.scrollHeight);
      console.log(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);
  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join the conversation</Divider>
      </div>
      <div>
        <ChatRoomList aboveElHeight={height} />
      </div>
    </div>
  );
}

export default Sidebar;
