import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Tag, Icon, Button, Alert } from 'rsuite';
import { auth } from '../../misc/firebase';

function ProviderBlock() {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });
  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return { ...p, [providerId]: value };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const uninkGoogle = () => {
    unlink('google.com');
  };
  const unlinkFacebook = () => {
    unlink('facebook.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      updateIsConnected(provider.providerId, true);
      Alert.success(`Successfully Linked!${provider.providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={uninkGoogle}>
          <Icon icon="google" />
          &ensp;Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <Icon icon="facebook" />
          &ensp; Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['facebook.com'] && (
          <Button color="blue" block onClick={linkFacebook}>
            <Icon icon="facebook" />
            &ensp; Sign In to Facebook
          </Button>
        )}
        {!isConnected['google.com'] && (
          <Button color="green" block onClick={linkGoogle}>
            <Icon icon="google" />
            &ensp; Sign In to Google
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProviderBlock;
