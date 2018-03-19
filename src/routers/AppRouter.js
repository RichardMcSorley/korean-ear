import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import HomePage from "./../components/Pages/HomePage";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import React from "react";
import SelectionPage from '../components/Pages/SelectionPage'
import PracticePage from '../components/Pages/PracticePage'
import TestPage from '../components/Pages/TestPage'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const history = createHistory();


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
}

    render() {
      const currentKey = location.hash
      const timeout = { enter: 800, exit: 800 }
      console.log('this.props', currentKey);
      return (
        <Route render={({location})=>{
          return (
            <TransitionGroup component="main" className="page-main" appear>
              <CSSTransition key={currentKey} timeout={timeout} classNames="fade" appear>
                <Switch location={location}>
                  <Route path="/" exact={true} component={HomePage} />
                  <Route path="/select" component={SelectionPage} />
                  <Route path="/practice" component={PracticePage} />
                  <Route path="/test"  component={TestPage} />
                </Switch>
            </CSSTransition>
          </TransitionGroup>
          )
        }}/>

);
}
}

export default AppRouter;
