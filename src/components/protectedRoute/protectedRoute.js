import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Redirect, Route } from 'react-router';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
