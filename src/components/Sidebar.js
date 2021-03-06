import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';
import CreateRoomBtnModal from './CreateRoomBtnModal';

function Sidebar() {
  const topSideBarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSideBarRef.current) {
      setHeight(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);
  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider style={{ margin: 0, padding: '30px 0' }}>
          Join conversation
        </Divider>
      </div>
      <ChatRoomList aboveHeight={height} />
    </div>
  );
}

export default Sidebar;
