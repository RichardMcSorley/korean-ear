import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import HomePage from "./../components/Pages/HomePage";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import React from "react";
import SelectionPage from '../components/Pages/SelectionPage'
import PracticePage from '../components/Pages/PracticePage'
import TestPage from '../components/Pages/TestPage'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/select" component={SelectionPage} />
        <Route path="/practice" component={PracticePage} />
        <Route path="/test"  component={TestPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
