import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnSub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt } = snap.val();

          const data = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setLoad(false);
        });
      } else {
        // if (userRef) {
        //   userRef.off();
        // }
        setProfile(null);
        setLoad(false);
      }
    });

    // return () => {
    //   authUnSub();
    //   if (userRef) {
    //     userRef.off();
    //   }
    // };
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
