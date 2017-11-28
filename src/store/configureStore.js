import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import cartReducer from "../reducers/cart";
import blankReducer from '../reducers/blank';
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      blank: blankReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
