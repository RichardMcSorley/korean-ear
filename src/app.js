import "./styles/styles.scss";
import "normalize.css/normalize.css";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, grey900, grey700, red900,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: '#f7f7f7',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#000',
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: darkBlack,
    canvasColor: '#f7f7f7',
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  button: {
  height: 67,
  minWidth: 88,
  iconButtonSize: spacing.iconSize * 2,
},
});
const store = configureStore();

const App = (
  <MuiThemeProvider muiTheme={muiTheme}>
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
