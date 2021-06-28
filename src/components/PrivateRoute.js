import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

function PrivateRoute({ children, ...routeProps }) {
  const { profile, load } = useProfile();

  if (load && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="loading" speed="slow" />
      </Container>
    );
  }

  if (!profile && !load) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
}

export default PrivateRoute;
