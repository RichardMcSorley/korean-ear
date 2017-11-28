import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import HomePage from "./../components/HomePage";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import React from "react";

export const history = createHistory();

console.log('history', history);
const woo = (<div>woo</div>);
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
