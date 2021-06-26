import React from 'react';
import firebase from 'firebase/app';
import { Col, Container, Grid, Row, Panel, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

function SignIn() {
  const signInProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success('Signed In Successfully', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const onFBSignIn = () => {
    signInProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGGLSignIn = () => {
    signInProvider(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive Chat Platform</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFBSignIn}>
                  <Icon icon="facebook" />
                  &ensp; Continue with Facebook
                </Button>
                <Button block color="green" onClick={onGGLSignIn}>
                  <Icon icon="google" />
                  &ensp; Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignIn;
