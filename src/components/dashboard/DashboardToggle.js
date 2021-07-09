import React, { useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';

function DashboardToggle() {
  const { isOpen, close, open } = useModalState();
  const is992px = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();

        Alert.info('Signed Out!', 4000);

        close();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"> &ensp; Dashboard</Icon>
      </Button>
      <Drawer full={is992px} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
