import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

function PublicRoute({ children, ...routeProps }) {
  const { profile, load } = useProfile();

  if (load && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (profile && !load) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
}

export default PublicRoute;
