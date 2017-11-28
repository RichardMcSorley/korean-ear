import "./styles/styles.scss";
import "normalize.css/normalize.css";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

const App = (
  <MuiThemeProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </MuiThemeProvider>
);


if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

function startApp() {
  ReactDOM.render(App, document.getElementById("app"));
  console.log('App is running!');
}
