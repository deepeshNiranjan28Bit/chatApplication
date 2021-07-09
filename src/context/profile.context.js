import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let userRef;
    var userStatusRef;

    const authUnSub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            avatar,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setLoad(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (!!snapshot.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        database.ref('.info/connected').off();

        if (userStatusRef) {
          userStatusRef.off();
        }
        setProfile(null);
        setLoad(false);
      }
    });

    return () => {
      authUnSub();
      if (userRef) {
        userRef.off();
      }
      database.ref('.info/connected').off();
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ load, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
