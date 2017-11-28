import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
