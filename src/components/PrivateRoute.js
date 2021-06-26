import React from 'react';
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

function PrivateRoute({ children, ...routeProps }) {
  const profile = useProfile();

  if (!profile) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
}

export default PrivateRoute;
