import { Route, Switch, Router } from "react-router-dom";
import createHistory from "history/createHashHistory";
import HomePage from "./../components/Pages/HomePage";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import React from "react";
import SelectionPage from '../components/Pages/SelectionPage'
import PracticePage from '../components/Pages/PracticePage'
import TestPage from '../components/Pages/TestPage'
import { CSSTransitionGroup } from 'react-transition-group'

export const history = createHistory();

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.currentPage = location.pathname;

    this.pages = {
      '/': 0,
      '/about': 1,
      '/contact': 2
    }
  }


getDirection() {
 let nextPage = location.pathname;
 let nextPageIndex = this.pages[nextPage];
 let currentPageIndex = this.pages[this.currentPage];

 this.currentPage = location.pathname;

 if (currentPageIndex < nextPageIndex) {
   return 'rtl'
 } else if (currentPageIndex > nextPageIndex){
   return 'ltr'
 }

 return null;
}

getAnimation() {
 let direction = this.getDirection();
 let calculatedAnimations = {};
 let animationPrefix = 'navigation';

 if (direction === 'rtl') {
   calculatedAnimations.enter = `${animationPrefix}-enter-rtl`;
   calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
   calculatedAnimations.leave = `${animationPrefix}-leave-rtl`;
   calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
 } else if (direction === 'ltr'){
   calculatedAnimations.enter = `${animationPrefix}-enter-ltr`;
   calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
   calculatedAnimations.leave = `${animationPrefix}-leave-ltr`;
   calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
 } else {
   calculatedAnimations.enter = `${animationPrefix}-enter-fade`;
   calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
   calculatedAnimations.leave = `${animationPrefix}-leave-fade`;
   calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
 }

 return calculatedAnimations;
}

getAnimationSpeed() {
 let direction = this.getDirection();

 /*
  * Time values must be equal to $naviagtion-animation-time-cross-page and $naviagtion-animation-time-current-page @ variables.scss
  */
 const activePageAnimationSpeed = 600;
 const crossPageAnimationSpeed = 300;

 if (direction === null) {
   return activePageAnimationSpeed
 }

 return crossPageAnimationSpeed;
}
renderCSSGroup = ({location}) => {
  return (
    <CSSTransitionGroup
      component="div"
      className="transition-container"
      transitionName={this.getAnimation()}
      transitionEnterTimeout={this.getAnimationSpeed()}
      transitionLeaveTimeout={this.getAnimationSpeed()}
      >

    </CSSTransitionGroup>
  )
}

    render() {
      return (
          <Router history={history}>
            <Switch>
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/select" component={SelectionPage} />
              <Route path="/practice" component={PracticePage} />
              <Route path="/test"  component={TestPage} />
            </Switch>
          </Router>
);
}
}

export default AppRouter;
