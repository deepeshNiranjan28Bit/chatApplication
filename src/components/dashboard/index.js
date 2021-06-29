import React, { Profiler } from 'react';
import { Drawer, Button, Divider } from 'rsuite';
import EditableInput from '../EditableInput';
import { useProfile } from '../../context/profile.context';

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async newData => {
    console.log(newData);
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">NickName</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
