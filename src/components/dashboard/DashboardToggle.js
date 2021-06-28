import React from 'react';
import { Button, Icon, Drawer } from 'rsuite';
import Dashboard from '.';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';

function DashboardToggle() {
  const { isOpen, close, open } = useModalState();
  const is992px = useMediaQuery('(max-width: 992px)');

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"> &ensp; Dashboard</Icon>
      </Button>
      <Drawer full={is992px} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
