import * as React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "./is_authenticated";


export const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
      isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
);
