import * as React from "react";
import { Route, Redirect } from "react-router";
import { clientSession } from "./auth.session";

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
      clientSession.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
);
