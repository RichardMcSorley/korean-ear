import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import React from "react";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
        <Component {...props}/>
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
