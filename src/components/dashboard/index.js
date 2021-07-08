import React, { Profiler } from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import EditableInput from '../EditableInput';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdate } from '../../misc/helpers';

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async newData => {
    try {
      const updates = await getUserUpdate(
        profile.uid,
        'name',
        newData,
        database
      );

      await database.ref().update(updates);

      Alert.success('Successful edit!', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          label={<h6 className="mb-2">NickName</h6>}
          onSave={onSave}
        />
        <AvatarUploadBtn />
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
